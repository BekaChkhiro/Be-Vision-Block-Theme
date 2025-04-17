document.addEventListener('DOMContentLoaded', function() {
    if (!window.bevisionSettings) {
        console.error('bevisionSettings is not defined');
        return;
    }
    
    const filterBlocks = document.querySelectorAll('.blog-posts-filter');
    
    filterBlocks.forEach(block => {
        const postsContainer = block.querySelector('.posts-grid-container');
        const tabsContainer = block.querySelector('.posts-tabs-container');
        const loadMoreButton = block.querySelector('.load-more-button');
        const loadingIndicator = block.querySelector('.loading-indicator');
        
        if (!postsContainer || !tabsContainer || !loadMoreButton || !loadingIndicator) {
            console.error('Required elements not found in the block');
            return;
        }

        const postsPerPage = parseInt(block.dataset.postsPerPage) || 4;
        const maxPosts = parseInt(block.dataset.maxPosts) || 12;
        let categories = [];
        try {
            categories = JSON.parse(block.dataset.categories || '[]');
        } catch (e) {
            console.error('Error parsing categories:', e);
            categories = [];
        }
        
        let currentCategory = block.dataset.currentTab || 'all';
        let currentPage = 1;
        let isLoading = false;
        let hasMore = true;

        function loadPosts(resetContainer = false) {
            if (isLoading) return;
            
            isLoading = true;
            loadingIndicator.style.display = 'block';
            loadMoreButton.style.display = 'none';

            if (resetContainer) {
                postsContainer.innerHTML = '<div class="loading">პოსტების ჩატვირთვა...</div>';
            }

            const formData = new FormData();
            formData.append('action', 'get_posts');
            formData.append('nonce', bevisionSettings.nonce);
            formData.append('page', currentPage);
            formData.append('per_page', postsPerPage);
            formData.append('category', currentCategory);

            fetch(bevisionSettings.ajaxUrl, {
                method: 'POST',
                body: formData,
                credentials: 'same-origin'
            })
            .then(response => response.json())
            .then(response => {
                if (!response.success) {
                    throw new Error('Failed to load posts');
                }
                
                const { posts, total, max_pages } = response.data;
                
                if (resetContainer) {
                    postsContainer.innerHTML = '';
                }

                if (posts && posts.length > 0) {
                    posts.forEach(post => {
                        const postElement = document.createElement('div');
                        postElement.className = 'post-card';
                        
                        const imageUrl = post.featured_image_url || 
                                       `${bevisionSettings.themeUrl}/assets/images/post-placeholder.jpg`;
                        
                        postElement.innerHTML = `
                            <a href="${post.link}" class="post-link">
                                <div class="post-image-container">
                                    <img 
                                        src="${imageUrl}"
                                        alt="${post.title.rendered}"
                                        class="post-image"
                                        loading="lazy"
                                    />
                                </div>
                                <div class="post-content">
                                    ${post.categories && post.categories.length ? `
                                        <div class="post-categories">
                                            <span class="post-category">
                                                ${post.categories[0].name}
                                            </span>
                                        </div>
                                    ` : ''}
                                    <h3 class="post-title">${post.title.rendered}</h3>
                                </div>
                            </a>
                        `;
                        
                        postsContainer.appendChild(postElement);
                    });

                    hasMore = currentPage < max_pages && (currentPage * postsPerPage) < Math.min(total, maxPosts);
                } else {
                    postsContainer.innerHTML = '<div class="no-posts">პოსტები ვერ მოიძებნა</div>';
                    hasMore = false;
                }
                
                loadMoreButton.style.display = hasMore ? 'block' : 'none';
                loadingIndicator.style.display = 'none';
                isLoading = false;
            })
            .catch(error => {
                console.error('Error loading posts:', error);
                postsContainer.innerHTML = `
                    <div class="error-message">
                        პოსტების ჩატვირთვა ვერ მოხერხდა. გთხოვთ სცადოთ თავიდან.<br>
                        <small>${bevisionSettings.debug ? error.message : ''}</small>
                    </div>
                `;
                loadingIndicator.style.display = 'none';
                loadMoreButton.style.display = 'none';
                isLoading = false;
            });
        }

        function initializeTabs() {
            tabsContainer.innerHTML = '';

            if (categories && categories.length > 0) {
                categories.forEach(category => {
                    const tab = document.createElement('button');
                    tab.className = 'post-tab-item' + (category.id === currentCategory ? ' active' : '');
                    tab.dataset.categoryId = category.id;
                    tab.textContent = category.name;
                    tabsContainer.appendChild(tab);

                    tab.addEventListener('click', () => {
                        if (isLoading) return;
                        
                        const tabs = block.querySelectorAll('.post-tab-item');
                        tabs.forEach(t => t.classList.remove('active'));
                        tab.classList.add('active');
                        
                        currentCategory = category.id;
                        currentPage = 1;
                        loadPosts(true);
                    });
                });

                loadPosts(true);
            }
        }

        loadMoreButton.addEventListener('click', () => {
            if (!isLoading && hasMore) {
                currentPage++;
                loadPosts(false);
            }
        });

        // Initialize tabs and load initial posts
        initializeTabs();
    });
});