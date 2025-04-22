document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing posts tab...');
    
    const filterBlocks = document.querySelectorAll('.blog-posts-filter');
    console.log('Found filter blocks:', filterBlocks.length);
    
    filterBlocks.forEach(block => {
        const postsContainer = block.querySelector('.posts-grid-container');
        const tabsContainer = block.querySelector('.posts-tabs-container');
        const loadMoreButton = block.querySelector('.load-more-button');
        const loadingIndicator = block.querySelector('.loading-indicator');
        
        if (!postsContainer || !tabsContainer || !loadMoreButton || !loadingIndicator) {
            console.error('Required elements not found');
            return;
        }

        // Get configuration from data attributes
        const postsPerPage = parseInt(block.dataset.postsPerPage) || 4;
        const maxPosts = parseInt(block.dataset.maxPosts) || 12;
        let categories = [];
        try {
            categories = JSON.parse(block.dataset.categories || '[]');
            console.log('Loaded categories:', categories);
        } catch (e) {
            console.error('Error parsing categories:', e);
            categories = [];
        }
        
        let currentCategory = block.dataset.currentTab || 'all';
        let currentPage = 1;
        let isLoading = false;
        let hasMore = true;

        // Initialize tabs
        function initializeTabs() {
            console.log('Initializing tabs...');
            tabsContainer.innerHTML = '';

            if (categories && categories.length > 0) {
                categories.forEach(category => {
                    const tab = document.createElement('button');
                    tab.className = 'post-tab-item' + (category.id === currentCategory ? ' active' : '');
                    tab.dataset.categoryId = category.id;
                    tab.textContent = category.name;
                    tab.style.cssText = `
                        padding: 12px 24px;
                        background: ${category.id === currentCategory ? '#6653C6' : '#f0f0f0'};
                        color: ${category.id === currentCategory ? '#ffffff' : '#333'};
                        border: none;
                        border-radius: 8px;
                        font-size: 16px;
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    `;
                    
                    tab.addEventListener('click', () => {
                        if (isLoading) return;
                        
                        const tabs = block.querySelectorAll('.post-tab-item');
                        tabs.forEach(t => {
                            t.classList.remove('active');
                            t.style.background = '#f0f0f0';
                            t.style.color = '#333';
                        });
                        tab.classList.add('active');
                        tab.style.background = '#6653C6';
                        tab.style.color = '#ffffff';
                        
                        currentCategory = category.id;
                        currentPage = 1;
                        loadPosts(true);
                    });
                    
                    tabsContainer.appendChild(tab);
                });
            }
        }

        // Load posts
        function loadPosts(resetContainer = false) {
            if (isLoading) return;
            
            console.log('Loading posts:', {
                category: currentCategory,
                page: currentPage,
                perPage: postsPerPage
            });
            
            isLoading = true;
            loadingIndicator.style.display = 'block';
            loadMoreButton.style.display = 'none';

            if (resetContainer) {
                postsContainer.innerHTML = '<div class="loading">პოსტების ჩატვირთვა...</div>';
            }

            const formData = new FormData();
            formData.append('action', 'get_posts');
            formData.append('category', currentCategory);
            formData.append('page', currentPage);
            formData.append('per_page', postsPerPage);

            fetch(window.bevisionSettings.ajaxUrl, {
                method: 'POST',
                body: formData,
                credentials: 'same-origin'
            })
            .then(response => response.json())
            .then(response => {
                console.log('Received response:', response);
                
                if (!response.success) {
                    throw new Error(response.data?.message || 'Failed to load posts');
                }
                
                const { posts, total, max_pages } = response.data;
                
                if (resetContainer) {
                    postsContainer.innerHTML = '';
                }

                if (posts && posts.length > 0) {
                    posts.forEach(post => {
                        const postElement = document.createElement('div');
                        postElement.className = 'post-card';
                        postElement.style.cssText = `
                            border-radius: 12px;
                            overflow: hidden;
                            box-shadow: 0 4px 10px rgba(0,0,0,0.08);
                            transition: all 0.3s ease;
                            background: #fff;
                        `;
                        
                        postElement.innerHTML = `
                            <a href="${post.link}" style="text-decoration: none; color: inherit;">
                                <div style="width: 100%; height: 200px; overflow: hidden;">
                                    <img 
                                        src="${post.featured_image_url || `${window.bevisionSettings.themeUrl}/assets/images/post-placeholder.jpg`}"
                                        alt="${post.title.rendered}"
                                        style="width: 100%; height: 100%; object-fit: cover;"
                                        loading="lazy"
                                    />
                                </div>
                                <div style="padding: 20px;">
                                    ${post.categories && post.categories[0] ? `
                                        <span style="
                                            color: #6653C6;
                                            font-size: 14px;
                                            font-weight: 600;
                                            margin-bottom: 8px;
                                            display: block;
                                        ">
                                            ${post.categories[0].name}
                                        </span>
                                    ` : ''}
                                    <h3 style="
                                        font-size: 18px;
                                        font-weight: 700;
                                        margin: 0;
                                        color: #333;
                                        line-height: 1.4;
                                    ">${post.title.rendered}</h3>
                                </div>
                            </a>
                        `;
                        
                        postsContainer.appendChild(postElement);
                    });

                    hasMore = currentPage < max_pages && posts.length === postsPerPage && 
                             (currentPage * postsPerPage) < Math.min(total, maxPosts);
                } else {
                    if (resetContainer) {
                        postsContainer.innerHTML = '<div style="text-align: center; padding: 40px;">პოსტები ვერ მოიძებნა</div>';
                    }
                    hasMore = false;
                }
                
                loadMoreButton.style.display = hasMore ? 'block' : 'none';
            })
            .catch(error => {
                console.error('Error loading posts:', error);
                if (resetContainer) {
                    postsContainer.innerHTML = `
                        <div style="text-align: center; padding: 40px; color: #ff4444;">
                            პოსტების ჩატვირთვა ვერ მოხერხდა. გთხოვთ სცადოთ თავიდან.<br>
                            <small>${error.message}</small>
                        </div>
                    `;
                }
            })
            .finally(() => {
                isLoading = false;
                loadingIndicator.style.display = 'none';
            });
        }

        // Add event listener for load more button
        loadMoreButton.addEventListener('click', () => {
            if (!isLoading && hasMore) {
                currentPage++;
                loadPosts(false);
            }
        });

        // Initialize layout
        postsContainer.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 30px;
            margin-bottom: 40px;
        `;
        
        loadMoreButton.style.cssText = `
            padding: 12px 30px;
            background: #6653C6;
            color: #fff;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        `;

        // Start loading
        initializeTabs();
        loadPosts(true);
    });
});