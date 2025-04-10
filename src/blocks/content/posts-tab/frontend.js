document.addEventListener('DOMContentLoaded', function() {
    const filterBlocks = document.querySelectorAll('.blog-posts-filter');
    
    filterBlocks.forEach(block => {
        const postsContainer = block.querySelector('.posts-grid-container');
        const tabsContainer = block.querySelector('.posts-tabs-container');
        const loadMoreButton = block.querySelector('.load-more-button');
        const loadingIndicator = block.querySelector('.loading-indicator');
        
        const postsPerPage = parseInt(block.dataset.postsPerPage) || 4;
        const maxPosts = parseInt(block.dataset.maxPosts) || 12;
        let currentCategory = null; // საწყისი კატეგორია null
        let currentPage = 1;
        let isLoading = false;
        let hasMore = true;

        // კატეგორიების სასურველი თანმიმდევრობა
        const categoryOrder = [
            'News',
            'Case studies',
            'Customer story',
        ];

        function initializeTabs() {
            fetch(bevisionSettings.restUrl + 'wp/v2/categories?per_page=100&hide_empty=1')
                .then(response => response.json())
                .then(categories => {
                    // გავასუფთავოთ ტაბების კონტეინერი
                    tabsContainer.innerHTML = '';

                    // დავახარისხოთ კატეგორიები სასურველი თანმიმდევრობით
                    const sortedCategories = categories
                        .filter(category => category.count > 0)
                        .sort((a, b) => {
                            // Other category ყოველთვის ბოლოში
                            if (a.name === 'Other') return 1;
                            if (b.name === 'Other') return -1;
                            
                            const indexA = categoryOrder.indexOf(a.name);
                            const indexB = categoryOrder.indexOf(b.name);
                            
                            // თუ ორივე კატეგორია არის სიაში
                            if (indexA !== -1 && indexB !== -1) {
                                return indexA - indexB;
                            }
                            
                            // თუ მხოლოდ ერთი კატეგორიაა სიაში
                            if (indexA !== -1) return -1;
                            if (indexB !== -1) return 1;
                            
                            // თუ არცერთი არ არის სიაში, დავალაგოთ ანბანის მიხედვით
                            return a.name.localeCompare(b.name);
                        });
                    
                    if (sortedCategories.length > 0) {
                        sortedCategories.forEach((category, index) => {
                            const tab = document.createElement('button');
                            tab.className = 'post-tab-item' + (index === 0 ? ' active' : '');
                            tab.dataset.categoryId = category.id;
                            tab.textContent = category.name;
                            tabsContainer.appendChild(tab);

                            // პირველი კატეგორია გავხადოთ მიმდინარე
                            if (index === 0) {
                                currentCategory = category.id;
                            }
                        });

                        // დავამატოთ click ივენთები
                        const tabs = block.querySelectorAll('.post-tab-item');
                        tabs.forEach(tab => {
                            tab.addEventListener('click', () => {
                                if (isLoading) return;
                                
                                tabs.forEach(t => t.classList.remove('active'));
                                tab.classList.add('active');
                                
                                currentCategory = tab.dataset.categoryId;
                                currentPage = 1;
                                loadPosts(true);
                            });
                        });

                        // ჩავტვირთოთ პირველი კატეგორიის პოსტები
                        loadPosts(true);
                    }
                });
        }

        // Load More Button Click
        loadMoreButton.addEventListener('click', () => {
            if (!isLoading && hasMore) {
                currentPage++;
                loadPosts(false);
            }
        });

        function getFeaturedImage(post) {
            if (post.featured_image) {
                return post.featured_image.blog_card || 
                       post.featured_image.medium || 
                       post.featured_image.full;
            }
            
            if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
                const media = post._embedded['wp:featuredmedia'][0];
                if (media.media_details && media.media_details.sizes) {
                    const sizes = media.media_details.sizes;
                    return sizes.blog_card?.source_url || 
                           sizes.medium?.source_url || 
                           media.source_url;
                }
                return media.source_url;
            }
            
            return bevisionSettings.themeUrl + '/assets/images/post-placeholder.jpg';
        }

        function loadPosts(resetContainer = false) {
            if (isLoading || !currentCategory) return;
            
            isLoading = true;
            loadingIndicator.style.display = 'block';
            loadMoreButton.style.display = 'none';
            
            // ყოველთვის ვიყენებთ კატეგორიის ფილტრს
            const apiUrl = bevisionSettings.restUrl + 'wp/v2/posts?_embed&per_page=' + postsPerPage + 
                          '&page=' + currentPage + '&categories=' + currentCategory;
            
            fetch(apiUrl, {
                headers: {
                    'X-WP-Nonce': bevisionSettings.nonce
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const totalPosts = parseInt(response.headers.get('X-WP-Total'));
                hasMore = currentPage * postsPerPage < Math.min(totalPosts, maxPosts);
                return response.json();
            })
            .then(posts => {
                if (resetContainer) {
                    postsContainer.innerHTML = '';
                }
                
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.className = 'post-card';
                    
                    const imageUrl = getFeaturedImage(post);
                    const imageHtml = `
                        <div class="post-image-container">
                            <img 
                                src="${imageUrl}"
                                alt="${post.title.rendered}"
                                class="post-image"
                                loading="lazy"
                                onerror="this.onerror=null; this.src='${bevisionSettings.themeUrl}/assets/images/post-placeholder.jpg';"
                            />
                        </div>
                    `;
                    
                    let categoriesHtml = '';
                    if (post.categories_data && post.categories_data.length > 0) {
                        categoriesHtml = `
                            <div class="post-categories">
                                ${post.categories_data.map(cat => `
                                    <span class="post-category" style="color: ${cat.color}">
                                        ${cat.name}
                                    </span>
                                `).join('')}
                            </div>
                        `;
                    }
                    
                    postElement.innerHTML = `
                        <a href="${post.link}" class="post-link">
                            ${imageHtml}
                            <div class="post-content">
                                ${categoriesHtml}
                                <h3 class="post-title">${post.title.rendered}</h3>
                            </div>
                        </a>
                    `;
                    
                    postsContainer.appendChild(postElement);
                });
                
                loadMoreButton.style.display = hasMore ? 'block' : 'none';
                loadingIndicator.style.display = 'none';
                isLoading = false;
                
                if (resetContainer && posts.length === 0) {
                    postsContainer.innerHTML = '<div class="no-posts">პოსტები ვერ მოიძებნა</div>';
                }
            })
            .catch(error => {
                console.error('Error loading posts:', error);
                loadingIndicator.style.display = 'none';
                loadMoreButton.style.display = hasMore ? 'block' : 'none';
                isLoading = false;
                
                if (resetContainer) {
                    postsContainer.innerHTML = '<div class="error-message">პოსტების ჩატვირთვა ვერ მოხერხდა. გთხოვთ სცადოთ თავიდან.</div>';
                }
            });
        }

        // Initialize tabs and load initial posts
        initializeTabs();
    });
});