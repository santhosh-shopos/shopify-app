/**
 * ═══════════════════════════════════════════════════════════════════════
 * ShopOS Product Full - Complete Product Page with A/B Testing
 * Version: 1.0.0
 * 
 * Features:
 * - A/B Testing with localStorage persistence
 * - Image gallery with thumbnails and navigation
 * - Add to Cart & Buy Now CTAs with Shopify AJAX
 * - Comprehensive action tracking via console logs
 * - Mobile-first responsive design
 * ═══════════════════════════════════════════════════════════════════════
 */

(function() {
  'use strict';

  // =========================================================================
  // UTILITY FUNCTIONS
  // =========================================================================

  /**
   * Safely parse JSON string
   * @param {string} str - JSON string to parse
   * @returns {Object|null} Parsed object or null
   */
  const safeParse = (str) => {
    if (!str || str === 'null' || str === 'undefined') {
      return null;
    }
    try {
      return JSON.parse(str);
    } catch (error) {
      console.warn('[ShopOS] Failed to parse JSON:', error);
      return null;
    }
  };

  /**
   * Get or create A/B test assignment for a product
   * @param {string} productId - Product ID
   * @returns {string} 'A' or 'B'
   */
  const getABAssignment = (productId) => {
    const storageKey = `shopos_ab_full_${productId}`;
    let assignment = localStorage.getItem(storageKey);
    
    if (assignment) {
      console.log(`[ShopOS AB Test] Existing assignment for product ${productId}:`, assignment);
      return assignment;
    }
    
    // Create new assignment
    assignment = Math.random() < 0.5 ? 'A' : 'B';
    localStorage.setItem(storageKey, assignment);
    console.log(`[ShopOS AB Test] New assignment for product ${productId}:`, assignment);
    
    return assignment;
  };

  // =========================================================================
  // PRODUCT FULL CLASS
  // =========================================================================

  class ShopOSProductFull {
    /**
     * Initialize ShopOS Product Full component
     * @param {HTMLElement} container - Main container element
     */
    constructor(container) {
      console.log('[ShopOS] Initializing Product Full component...');
      
      // Store container and product ID
      this.container = container;
      this.productId = container.dataset.productId;
      
      // Cache DOM elements
      this.elements = {
        mainImage: container.querySelector('#shopos-full-main-image'),
        thumbnails: container.querySelector('#shopos-full-thumbnails'),
        title: container.querySelector('#shopos-full-title-content'),
        description: container.querySelector('#shopos-full-description-content'),
        price: container.querySelector('#shopos-full-price'),
        form: container.querySelector('#shopos-full-product-form'),
        addToCartBtn: container.querySelector('#shopos-full-add-to-cart-btn'),
        buyNowBtn: container.querySelector('#shopos-full-buy-now-btn'),
        variantSelect: container.querySelector('#shopos-full-variant-select'),
        quantityInput: container.querySelector('#shopos-full-quantity'),
        successMessage: container.querySelector('#shopos-full-success-message'),
        errorMessage: container.querySelector('#shopos-full-error-message')
      };
      
      // Gallery state
      this.currentImageIndex = 0;
      this.images = [];
      
      console.log(`[ShopOS] Product ID: ${this.productId}`);
      
      // Initialize
      this.init();
    }

    /**
     * Initialize component
     */
    init() {
      console.log('[ShopOS] Starting initialization...');
      
      // Apply A/B test variant if available
      this.applyABTestVariant();
      
      // Setup event listeners
      this.setupEventListeners();
      
      // Setup image gallery
      this.setupImageGallery();
      
      console.log('[ShopOS] ✅ Initialization complete');
      console.log("Data set:", this.container.dataset)
    }

    /**
     * Apply A/B test variant to the page
     */
    applyABTestVariant() {
      const variantA = safeParse(this.container.dataset.variantA);
      const variantB = safeParse(this.container.dataset.variantB);
      
      console.log('[ShopOS AB Test] Variant A available:', !!variantA);
      console.log('[ShopOS AB Test] Variant B available:', !!variantB);
      
      if (!variantA && !variantB) {
        console.log('[ShopOS AB Test] No A/B test variants found, using default product data');
        return;
      }
      
      // Get assignment and apply variant
      const assignment = getABAssignment(this.productId);
      const selectedVariant = assignment === 'A' ? variantA : variantB;
      
      if (selectedVariant) {
        console.log('[ShopOS AB Test] Applying variant:', assignment);
        this.applyVariantData(selectedVariant);
      } else {
        const fallbackVariant = variantA || variantB;
        console.log('[ShopOS AB Test] Selected variant unavailable, using fallback');
        this.applyVariantData(fallbackVariant);
      }
    }

    /**
     * Apply variant data to the page
     * @param {Object} variant - Variant data
     */
    applyVariantData(variant) {
      if (!variant) return;
      
      console.log('[ShopOS AB Test] Applying variant data:', variant);
      
      // Update images
      if (variant.images && variant.images.length > 0) {
        console.log(`[ShopOS] Updating images (${variant.images.length} total)`);
        this.updateImages(variant.images);
      }
      
      // Update title
      if (variant.title && this.elements.title) {
        console.log('[ShopOS] Updating title:', variant.title);
        this.elements.title.textContent = variant.title;
      }
      
      // Update description
      if (variant.description && this.elements.description) {
        console.log('[ShopOS] Updating description');
        let formatted = desc;

        if (!desc.trim().startsWith('<')) {
          // Convert \n\n into paragraph breaks
          formatted = desc
            .split(/\n\s*\n/)   // split double newlines
            .map(p => `<p>${p.trim()}</p>`)
            .join('');
        }
        
        this.elements.description.innerHTML = formatted;
      }
      
      // Update CTA buttons text
      if (variant.addToCartText && this.elements.addToCartBtn) {
        const btnText = this.elements.addToCartBtn.querySelector('.shopos-btn-text');
        if (btnText) {
          console.log('[ShopOS] Updating Add to Cart button text:', variant.addToCartText);
          btnText.textContent = variant.addToCartText;
        }
      }
      
      if (variant.buyNowText && this.elements.buyNowBtn) {
        const btnText = this.elements.buyNowBtn.querySelector('.shopos-btn-text');
        if (btnText) {
          console.log('[ShopOS] Updating Buy Now button text:', variant.buyNowText);
          btnText.textContent = variant.buyNowText;
        }
      }
    }

    /**
     * Update product images
     * @param {Array} images - Array of image URLs or objects
     */
    updateImages(images) {
      this.images = images;
      
      // Update main image
      if (this.elements.mainImage && images[0]) {
        const imageUrl = this.getShopifyImageUrl(images[0], '800x800');
        this.elements.mainImage.innerHTML = `
          <img 
            src="${imageUrl}" 
            alt="Product Image" 
            class="shopos-main-img" 
            width="800" 
            height="800" 
            loading="eager"
          >
        `;
        console.log('[ShopOS] Main image updated');
      }
      
      // Update thumbnails
      if (this.elements.thumbnails && images.length > 1) {
        const thumbnailsHTML = images.map((img, index) => `
          <div class="shopos-thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
            <img 
              src="${this.getShopifyImageUrl(img, '150x150')}" 
              alt="Thumbnail ${index + 1}" 
              width="150" 
              height="150" 
              loading="lazy"
            >
          </div>
        `).join('');
        
        this.elements.thumbnails.innerHTML = thumbnailsHTML;
        
        // Show thumbnail wrapper and nav arrows
        const thumbWrapper = this.container.querySelector('.shopos-thumbnails-wrapper');
        const navPrev = this.container.querySelector('.shopos-nav-prev');
        const navNext = this.container.querySelector('.shopos-nav-next');
        
        if (thumbWrapper) thumbWrapper.style.display = 'flex';
        if (navPrev) navPrev.style.display = 'flex';
        if (navNext) navNext.style.display = 'flex';
        
        console.log(`[ShopOS] ${images.length} thumbnails rendered`);
        
        // Re-attach thumbnail events
        this.setupThumbnailEvents();
      }
    }

    /**
     * Get Shopify CDN image URL with size parameter
     * @param {string|Object} img - Image URL or object
     * @param {string} size - Size parameter (e.g., '800x800')
     * @returns {string} Image URL
     */
    getShopifyImageUrl(img, size) {
      const url = typeof img === 'string' ? img : (img?.src || img);
      
      if (url && url.includes('cdn.shopify.com')) {
        return url.replace(/(_\d+x\d+)?(\.[^.]+)$/, `_${size}$2`);
      }
      
      return url;
    }

    /**
     * Setup image gallery functionality
     */
    setupImageGallery() {
      console.log('[ShopOS Gallery] Setting up image gallery...');
      
      this.setupThumbnailEvents();
      this.setupNavigationEvents();
      this.setupScrollEvents();
    }

    /**
     * Setup thumbnail click events
     */
    setupThumbnailEvents() {
      const thumbnails = this.container.querySelectorAll('.shopos-thumbnail');
      
      thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
          const index = parseInt(thumb.dataset.index);
          console.log(`[ShopOS Gallery] Thumbnail clicked - showing image ${index + 1}`);
          this.showImage(index);
        });
      });
    }

    /**
     * Setup navigation arrow events
     */
    setupNavigationEvents() {
      const prevBtn = this.container.querySelector('.shopos-nav-prev');
      const nextBtn = this.container.querySelector('.shopos-nav-next');
      
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          console.log('[ShopOS Gallery] Previous button clicked');
          this.showPreviousImage();
        });
      }
      
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          console.log('[ShopOS Gallery] Next button clicked');
          this.showNextImage();
        });
      }
    }

    /**
     * Setup thumbnail scroll events
     */
    setupScrollEvents() {
      const scrollLeft = this.container.querySelector('.shopos-thumb-scroll-left');
      const scrollRight = this.container.querySelector('.shopos-thumb-scroll-right');
      
      if (scrollLeft && this.elements.thumbnails) {
        scrollLeft.addEventListener('click', () => {
          console.log('[ShopOS Gallery] Scrolling thumbnails left');
          this.elements.thumbnails.scrollBy({ left: -150, behavior: 'smooth' });
        });
      }
      
      if (scrollRight && this.elements.thumbnails) {
        scrollRight.addEventListener('click', () => {
          console.log('[ShopOS Gallery] Scrolling thumbnails right');
          this.elements.thumbnails.scrollBy({ left: 150, behavior: 'smooth' });
        });
      }
    }

    /**
     * Show specific image by index
     * @param {number} index - Image index
     */
    showImage(index) {
      if (index < 0 || index >= this.images.length) return;
      
      this.currentImageIndex = index;
      
      // Update main image
      if (this.elements.mainImage) {
        const img = this.elements.mainImage.querySelector('img');
        if (img) {
          img.src = this.getShopifyImageUrl(this.images[index], '800x800');
          console.log(`[ShopOS Gallery] Displaying image ${index + 1} of ${this.images.length}`);
        }
      }
      
      // Update active thumbnail
      const thumbnails = this.container.querySelectorAll('.shopos-thumbnail');
      thumbnails.forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === index);
      });
    }

    /**
     * Show previous image
     */
    showPreviousImage() {
      const newIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
      this.showImage(newIndex);
    }

    /**
     * Show next image
     */
    showNextImage() {
      const newIndex = (this.currentImageIndex + 1) % this.images.length;
      this.showImage(newIndex);
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
      console.log('[ShopOS] Setting up event listeners...');
      
      // Add to Cart form submission
      if (this.elements.form) {
        this.elements.form.addEventListener('submit', (event) => {
          event.preventDefault();
          console.log('[ShopOS CTA] 🛒 Add to Cart button clicked');
          this.handleAddToCart();
        });
      }
      
      // Buy Now button
      if (this.elements.buyNowBtn) {
        this.elements.buyNowBtn.addEventListener('click', () => {
          console.log('[ShopOS CTA] ⚡ Buy Now button clicked');
          this.handleBuyNow();
        });
      }
      
      // Variant selection change
      if (this.elements.variantSelect) {
        this.elements.variantSelect.addEventListener('change', () => {
          const selectedOption = this.elements.variantSelect.options[this.elements.variantSelect.selectedIndex];
          console.log('[ShopOS] Variant changed:', selectedOption.text);
          this.updatePrice();
          this.updateAvailability();
        });
      }
      
      // Quantity buttons
      const minusBtn = this.container.querySelector('.shopos-qty-minus');
      const plusBtn = this.container.querySelector('.shopos-qty-plus');
      
      if (minusBtn && this.elements.quantityInput) {
        minusBtn.addEventListener('click', () => {
          const currentValue = parseInt(this.elements.quantityInput.value) || 1;
          if (currentValue > 1) {
            this.elements.quantityInput.value = currentValue - 1;
            console.log('[ShopOS] ➖ Quantity decreased to:', currentValue - 1);
          }
        });
      }
      
      if (plusBtn && this.elements.quantityInput) {
        plusBtn.addEventListener('click', () => {
          const currentValue = parseInt(this.elements.quantityInput.value) || 1;
          const maxValue = parseInt(this.elements.quantityInput.max) || 99;
          if (currentValue < maxValue) {
            this.elements.quantityInput.value = currentValue + 1;
            console.log('[ShopOS] ➕ Quantity increased to:', currentValue + 1);
          }
        });
      }
      
      console.log('[ShopOS] ✅ Event listeners attached');
    }

    /**
     * Handle Add to Cart action
     */
    async handleAddToCart() {
      if (!this.elements.form) {
        console.error('[ShopOS CTA] Form element not found');
        return;
      }
      
      const formData = new FormData(this.elements.form);
      const variantId = formData.get('id');
      const quantity = parseInt(formData.get('quantity')) || 1;
      
      console.log('[ShopOS CTA] Adding to cart:', { variantId, quantity });
      
      this.setButtonLoading(this.elements.addToCartBtn, true);
      this.hideMessages();
      
      try {
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            id: variantId,
            quantity: quantity
          })
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('[ShopOS CTA] ✅ Successfully added to cart:', data);
        
        this.showSuccess('Added to cart!');
        this.updateCartCount();
        
        // Dispatch custom event for other scripts
        document.dispatchEvent(new CustomEvent('cart:updated', { detail: data }));
        
      } catch (error) {
        console.error('[ShopOS CTA] ❌ Add to cart failed:', error);
        this.showError('Failed to add to cart. Please try again.');
      } finally {
        this.setButtonLoading(this.elements.addToCartBtn, false);
      }
    }

    /**
     * Handle Buy Now action
     */
    async handleBuyNow() {
      if (!this.elements.form) {
        console.error('[ShopOS CTA] Form element not found');
        return;
      }
      
      const formData = new FormData(this.elements.form);
      const variantId = formData.get('id');
      const quantity = parseInt(formData.get('quantity')) || 1;
      
      console.log('[ShopOS CTA] Processing Buy Now:', { variantId, quantity });
      
      this.setButtonLoading(this.elements.buyNowBtn, true);
      this.hideMessages();
      
      try {
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            id: variantId,
            quantity: quantity
          })
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        console.log('[ShopOS CTA] ✅ Buy Now successful, redirecting to checkout...');
        window.location.href = '/checkout';
        
      } catch (error) {
        console.error('[ShopOS CTA] ❌ Buy Now failed:', error);
        this.showError('Failed to process. Please try again.');
        this.setButtonLoading(this.elements.buyNowBtn, false);
      }
    }

    /**
     * Update cart count in header/nav
     */
    async updateCartCount() {
      try {
        const response = await fetch('/cart.js');
        const cart = await response.json();
        
        console.log('[ShopOS] 🛒 Cart updated - Items:', cart.item_count);
        
        // Update all cart count elements
        const selectors = '.cart-count, [data-cart-count], .cart-count-bubble';
        document.querySelectorAll(selectors).forEach(element => {
          element.textContent = cart.item_count;
          if (cart.item_count > 0) {
            element.classList.add('cart-count--visible');
          }
        });
        
      } catch (error) {
        console.warn('[ShopOS] Could not update cart count:', error);
      }
    }

    /**
     * Update price display
     */
    updatePrice() {
      if (!this.elements.variantSelect || !this.elements.price) return;
      
      const selectedOption = this.elements.variantSelect.options[this.elements.variantSelect.selectedIndex];
      const price = selectedOption.dataset.price;
      
      if (price) {
        this.elements.price.textContent = price;
        console.log('[ShopOS] 💰 Price updated to:', price);
      }
    }

    /**
     * Update button availability based on variant
     */
    updateAvailability() {
      if (!this.elements.variantSelect) return;
      
      const selectedOption = this.elements.variantSelect.options[this.elements.variantSelect.selectedIndex];
      const isAvailable = !selectedOption.disabled;
      
      if (this.elements.addToCartBtn) {
        this.elements.addToCartBtn.disabled = !isAvailable;
      }
      
      if (this.elements.buyNowBtn) {
        this.elements.buyNowBtn.disabled = !isAvailable;
      }
      
      console.log('[ShopOS] 📦 Availability updated - Available:', isAvailable);
    }

    /**
     * Set button loading state
     * @param {HTMLElement} button - Button element
     * @param {boolean} isLoading - Loading state
     */
    setButtonLoading(button, isLoading) {
      if (!button) return;
      
      if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
        const loadingSpinner = button.querySelector('.shopos-btn-loading');
        if (loadingSpinner) loadingSpinner.style.display = 'flex';
      } else {
        button.classList.remove('loading');
        button.disabled = false;
        const loadingSpinner = button.querySelector('.shopos-btn-loading');
        if (loadingSpinner) loadingSpinner.style.display = 'none';
      }
    }

    /**
     * Show success message
     * @param {string} message - Message text
     */
    showSuccess(message) {
      if (!this.elements.successMessage) return;
      
      const messageSpan = this.elements.successMessage.querySelector('span');
      if (messageSpan) {
        messageSpan.textContent = message;
      }
      
      this.elements.successMessage.style.display = 'flex';
      
      console.log('[ShopOS] ✅ Success message displayed:', message);
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        this.elements.successMessage.style.display = 'none';
      }, 5000);
    }

    /**
     * Show error message
     * @param {string} message - Error message text
     */
    showError(message) {
      if (!this.elements.errorMessage) return;
      
      this.elements.errorMessage.textContent = message;
      this.elements.errorMessage.style.display = 'block';
      
      console.error('[ShopOS] ❌ Error message displayed:', message);
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        this.elements.errorMessage.style.display = 'none';
      }, 5000);
    }

    /**
     * Hide all messages
     */
    hideMessages() {
      if (this.elements.successMessage) {
        this.elements.successMessage.style.display = 'none';
      }
      if (this.elements.errorMessage) {
        this.elements.errorMessage.style.display = 'none';
      }
    }
  }

  // =========================================================================
  // INITIALIZATION
  // =========================================================================

  /**
   * Initialize all ShopOS Product Full components on the page
   */
  function initializeComponents() {
    console.log('[ShopOS] 🚀 Searching for Product Full components...');
    
    const containers = document.querySelectorAll('.shopos-ab-test-product-full');
    console.log(`[ShopOS] Found ${containers.length} component(s)`);
    
    containers.forEach((container, index) => {
      console.log(`[ShopOS] Initializing component ${index + 1}/${containers.length}`);
      new ShopOSProductFull(container);
    });
    
    if (containers.length > 0) {
      console.log('[ShopOS] 🎉 All components initialized successfully');
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeComponents);
  } else {
    initializeComponents();
  }

  // Re-initialize on Shopify section events
  document.addEventListener('shopify:section:load', initializeComponents);
  document.addEventListener('shopify:section:reorder', initializeComponents);

})();
