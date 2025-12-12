
// ===================================
// Keak Embedded Script - Generated 2025-12-11T15:00:54.595Z
// Domain: 735 | Version: 2.0
// Variants: 2 | Split Tests: 0
// ===================================

// ===================================
// Debug Utility (Global - shared across all modules)
// ===================================
(function() {
  if (typeof window.KeakDebug !== 'undefined') return; // Already initialized
  
  // Check for Keak-debug cookie (supports both "Keak-debug=true" and "Keak-debug=true; ...")
  const checkDebugMode = () => {
    if (typeof document !== 'undefined' && document.cookie) {
      // Check for cookie in format: "Keak-debug=true" or "Keak-debug=true; other=cookie"
      const cookies = document.cookie.split(';').map(c => c.trim());
      return cookies.some(cookie => {
        const [name, value] = cookie.split('=').map(s => s.trim());
        // Only return true if value is explicitly 'true' or '1', not 'false' or any other value
        return name === 'Keak-debug' && (value === 'true' || value === '1');
      });
    }
    return false;
  };
  
  // Don't cache - check cookie every time to allow dynamic changes
  const getDebugMode = () => {
    return checkDebugMode();
  };
  
  window.KeakDebug = {
    isDebugMode: getDebugMode(),
    getDebugMode: getDebugMode,
    debugLog: function(...args) {
      if (getDebugMode()) console.log(...args);
    },
    debugWarn: function(...args) {
      if (getDebugMode()) console.warn(...args);
    }
  };
})();

// Create convenient aliases for modules (using var to allow redeclaration in modules)
var isDebugMode = () => window.KeakDebug.getDebugMode();
var debugLog = window.KeakDebug.debugLog;
var debugWarn = window.KeakDebug.debugWarn;

// Embedded test data
window.KEAK_EMBEDDED_DATA = {
  "domainId": 735,
  "variants": [
    {
      "testId": 1262,
      "version": "2025-12-11T15:00:17.417Z",
      "variantA": {
        "content": "Add to cart",
        "styles": null,
        "impressions": 0,
        "conversionRate": 0
      },
      "variantB": {
        "content": "Shop Now",
        "styles": null,
        "impressions": 0,
        "conversionRate": 0
      },
      "selector": "span.add-to-cart-text",
      "element_signatures": [],
      "type": "headline",
      "pageUrl": "https://ab-app-dev-store.myshopify.com/products/black-hoodie?pb=0",
      "isMultiPage": false,
      "isBalancedAssignment": true,
      "winningVariant": null,
      "groupId": 161,
      "groupTests": [
        1261
      ],
      "sprt": {
        "decision": "continue"
      }
    },
    {
      "testId": 1261,
      "version": "2025-12-11T15:00:15.530Z",
      "variantA": {
        "content": "Buy it now",
        "styles": null,
        "impressions": 0,
        "conversionRate": 0
      },
      "variantB": {
        "content": "Get it today",
        "styles": null,
        "impressions": 0,
        "conversionRate": 0
      },
      "selector": "shopify-accelerated-checkout",
      "element_signatures": [],
      "type": "headline",
      "pageUrl": "https://ab-app-dev-store.myshopify.com/products/black-hoodie?pb=0",
      "isMultiPage": false,
      "isBalancedAssignment": true,
      "winningVariant": null,
      "groupId": 161,
      "groupTests": [
        1262
      ],
      "sprt": {
        "decision": "continue"
      }
    }
  ],
  "splitTests": [],
  "conversionEvents": [
    {
      "eventId": 4312,
      "eventName": "Checkout_Completed",
      "eventType": "checkout_completed",
      "pageUrl": "",
      "matchType": "exact",
      "querySelectors": [],
      "testIds": [
        1261,
        1262
      ]
    }
  ],
  "customCookies": [],
  "generatedAt": "2025-12-11T15:00:54.595Z",
  "version": "2.0"
};

// Configuration
window.KEAK_CONFIG = {
  domainId: 735,
  host: 'https://script.keak.com',
  version: '2.0',
  generatedAt: '2025-12-11T15:00:54.595Z'
};

// Flag to prevent legacy script from running
window.KEAK_EMBEDDED_MODE = true;

// ===================================
// Shopify Detection & Integration
// ===================================
(function() {
  // Check if running on Shopify
  if (typeof window.Shopify !== 'undefined') {
    debugLog('🛍️ Keak: Shopify environment detected - loading Shopify integration scripts');
    
    // Get script API host from config
    const scriptApiHost = window.KEAK_CONFIG?.host || 'https://script.keak.com';
    const domainId = 735;
    
    // Load Shopify theme script (applies A/B test variants)
    const themeScript = document.createElement('script');
    themeScript.src = scriptApiHost + '/api/shopify/script/' + domainId + '/theme';
    themeScript.id = 'keak-shopify-theme-script';
    themeScript.async = true;
    themeScript.onload = function() {
      debugLog('✅ Keak: Shopify theme script loaded');
    };
    themeScript.onerror = function() {
      console.error('❌ Keak: Failed to load Shopify theme script');
    };
    document.head.appendChild(themeScript);
    
    // Load Shopify web pixel script (logs analytics)
    // This integrates with Shopify's analytics API
    const pixelScript = document.createElement('script');
    pixelScript.src = scriptApiHost + '/api/shopify/script/' + domainId + '/combined';
    pixelScript.id = 'keak-shopify-web-pixel-script';
    pixelScript.async = true;
    pixelScript.onload = function() {
      debugLog('✅ Keak: Shopify web pixel script loaded');
    };
    pixelScript.onerror = function() {
      console.error('❌ Keak: Failed to load Shopify web pixel script');
    };
    
    // Wait for Shopify analytics to be available
    if (typeof window.analytics !== 'undefined' && window.analytics.subscribe) {
      document.head.appendChild(pixelScript);
    } else {
      // Wait for Shopify analytics to initialize
      const checkAnalytics = setInterval(() => {
        if (typeof window.analytics !== 'undefined' && window.analytics.subscribe) {
          clearInterval(checkAnalytics);
          document.head.appendChild(pixelScript);
        }
      }, 100);
      
      // Timeout after 5 seconds
      setTimeout(() => clearInterval(checkAnalytics), 5000);
    }
    
    // Set flag to skip regular Keak script initialization on Shopify
    window.KEAK_SHOPIFY_MODE = true;
    debugLog('🛍️ Keak: Shopify integration complete');
  }
})();

// ===================================
// Storage Module (LocalStorage adapter)
// ===================================
/**
 * LocalStorage adapter for Keak variant assignments
 * Handles sticky assignments with version tracking, GC, and LRU eviction
 */

// Debug utility: use global if available (set by script template), otherwise create local fallback
if (typeof isDebugMode === "undefined") {
  var isDebugMode =
    typeof window !== "undefined" && window.KeakDebug
      ? () => window.KeakDebug.getDebugMode()
      : (() => {
          let cached = null;
          return () => {
            if (cached !== null) return cached;
            if (typeof document !== "undefined" && document.cookie) {
              const cookies = document.cookie.split(";").map((c) => c.trim());
              cached = cookies.some((cookie) => {
                const [name, value] = cookie.split("=").map((s) => s.trim());
                return name === "Keak-debug" && (value === "true" || value === "1");
              });
            } else {
              cached = false;
            }
            return cached;
          };
        })();
}

if (typeof debugWarn === "undefined") {
  var debugWarn =
    typeof window !== "undefined" && window.KeakDebug
      ? window.KeakDebug.debugWarn
      : (...args) => {
          if (isDebugMode()) console.warn(...args);
        };
}

const LS_KEY = "keak:assignments:v2";
const DEFAULT_CAP = 200;
const DEFAULT_TTL_DAYS = 60;

/**
 * Load assignments from localStorage with fallback to empty state
 */
function loadStore() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return initStore();

    const parsed = JSON.parse(raw);
    return parsed;
  } catch (e) {
    debugWarn("Keak: Failed to load assignments, resetting", e);
    return initStore();
  }
}

function initStore() {
  return {
    byTest: {},
    byGroup: {},
    meta: { lru: [], cap: DEFAULT_CAP, ttlDays: DEFAULT_TTL_DAYS }
  };
}

/**
 * Save assignments to localStorage with GC
 */
function saveStore(store) {
  try {
    // Run GC before save to keep size bounded
    gc(store);

    localStorage.setItem(LS_KEY, JSON.stringify(store));
  } catch (e) {
    console.error("Keak: Failed to save assignments", e);

    // Storage quota exceeded? Force aggressive GC
    if (e.name === "QuotaExceededError") {
      store.meta.cap = Math.floor(store.meta.cap * 0.5); // Cut cap in half
      gc(store);

      try {
        localStorage.setItem(LS_KEY, JSON.stringify(store));
      } catch (e2) {
        console.error("Keak: Failed even after aggressive GC", e2);
      }
    }
  }
}

/**
 * Get assignment for a test
 */
function getAssignment(testId) {
  const store = loadStore();
  const assignment = store.byTest[testId];

  if (!assignment) return null;

  // Check TTL
  const age = Date.now() - assignment.assignedAt;
  const maxAge = store.meta.ttlDays * 24 * 60 * 60 * 1000;

  if (age > maxAge) {
    // Expired - remove it
    delete store.byTest[testId];
    store.meta.lru = store.meta.lru.filter((id) => id !== testId);
    saveStore(store);
    return null;
  }

  // Update LRU
  store.meta.lru = [testId, ...store.meta.lru.filter((id) => id !== testId)];

  return { version: assignment.version, variantId: assignment.variantId };
}

/**
 * Set assignment for a test
 */
function setAssignment(testId, version, variantId) {
  const store = loadStore();

  store.byTest[testId] = {
    version,
    variantId,
    assignedAt: Date.now()
  };

  // Update LRU
  store.meta.lru = [testId, ...store.meta.lru.filter((id) => id !== testId)];

  saveStore(store);
}

/**
 * Get group assignment
 */
function getGroupAssignment(groupId) {
  const store = loadStore();
  if (!store.byGroup) return null;

  const group = store.byGroup[groupId];
  if (!group) return null;

  // Check TTL
  const age = Date.now() - group.assignedAt;
  const maxAge = store.meta.ttlDays * 24 * 60 * 60 * 1000;

  if (age > maxAge) {
    delete store.byGroup[groupId];
    saveStore(store);
    return null;
  }

  return { version: group.version, assignments: group.assignments };
}

/**
 * Set group assignment
 */
function setGroupAssignment(groupId, version, assignments) {
  const store = loadStore();

  if (!store.byGroup) store.byGroup = {};

  store.byGroup[groupId] = {
    version,
    assignedAt: Date.now(),
    assignments
  };

  // Also update individual test assignments for consistency
  for (const testId in assignments) {
    const variantId = assignments[testId];
    store.byTest[testId] = {
      version,
      variantId,
      assignedAt: Date.now()
    };

    // Update LRU
    store.meta.lru = [testId, ...store.meta.lru.filter((id) => id !== testId)];
  }

  saveStore(store);
}

/**
 * Garbage collection - remove expired and over-cap entries
 */
function gc(store) {
  const now = Date.now();
  const maxAge = store.meta.ttlDays * 24 * 60 * 60 * 1000;

  // Remove expired entries
  for (const testId in store.byTest) {
    const age = now - store.byTest[testId].assignedAt;
    if (age > maxAge) {
      delete store.byTest[testId];
      store.meta.lru = store.meta.lru.filter((id) => id !== testId);
    }
  }

  // Remove over-cap entries (LRU eviction)
  if (store.meta.lru.length > store.meta.cap) {
    const toRemove = store.meta.lru.slice(store.meta.cap);
    for (const testId of toRemove) {
      delete store.byTest[testId];
    }
    store.meta.lru = store.meta.lru.slice(0, store.meta.cap);
  }

  // GC groups
  if (store.byGroup) {
    for (const groupId in store.byGroup) {
      const age = now - store.byGroup[groupId].assignedAt;
      if (age > maxAge) {
        delete store.byGroup[groupId];
      }
    }
  }
}

/**
 * Clear all assignments (for testing/debugging)
 */
function clearStore() {
  localStorage.removeItem(LS_KEY);
}

// Expose on window for cross-module access
window.KeakStorage = {
  loadStore,
  saveStore,
  getAssignment,
  setAssignment,
  getGroupAssignment,
  setGroupAssignment,
  clearStore
};


// ===================================
// Assignment Module (Variant selection logic)
// ===================================
/**
 * Variant selection logic for Keak pixel
 * Handles impression-based assignment with version tracking
 */

// Debug utility: use global if available (set by script template), otherwise create local fallback
if (typeof isDebugMode === "undefined") {
  var isDebugMode =
    typeof window !== "undefined" && window.KeakDebug
      ? () => window.KeakDebug.getDebugMode()
      : (() => {
          let cached = null;
          return () => {
            if (cached !== null) return cached;
            if (typeof document !== "undefined" && document.cookie) {
              const cookies = document.cookie.split(";").map((c) => c.trim());
              cached = cookies.some((cookie) => {
                const [name, value] = cookie.split("=").map((s) => s.trim());
                return name === "Keak-debug" && (value === "true" || value === "1");
              });
            } else {
              cached = false;
            }
            return cached;
          };
        })();
}

if (typeof debugLog === "undefined") {
  var debugLog =
    typeof window !== "undefined" && window.KeakDebug
      ? window.KeakDebug.debugLog
      : (...args) => {
          if (isDebugMode()) console.log(...args);
        };
}

if (typeof debugWarn === "undefined") {
  var debugWarn =
    typeof window !== "undefined" && window.KeakDebug
      ? window.KeakDebug.debugWarn
      : (...args) => {
          if (isDebugMode()) console.warn(...args);
        };
}

/**
 * Parse ?kv URL parameter to get forced variants
 * Format: ?kv=testId:variant or ?kv=testId1:variant1,testId2:variant2
 * Returns a map of testId -> variant (e.g., { "123": "A", "456": "B" })
 */
function parseForcedVariants() {
  const forcedVariants = {};
  
  if (typeof window === "undefined" || !window.location) {
    return forcedVariants;
  }
  
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const kvParam = urlParams.get("kv");
    
    if (!kvParam) {
      return forcedVariants;
    }
    
    debugLog("🔧 Keak: Detected ?kv parameter:", kvParam);
    
    // Parse comma-separated list of testId:variant pairs
    const pairs = kvParam.split(",");
    
    for (const pair of pairs) {
      const trimmed = pair.trim();
      if (!trimmed) continue;
      
      const colonIndex = trimmed.indexOf(":");
      if (colonIndex === -1) {
        debugWarn(`⚠️ Keak: Invalid ?kv format (missing colon): ${trimmed}`);
        continue;
      }
      
      const testId = trimmed.substring(0, colonIndex).trim();
      const variant = trimmed.substring(colonIndex + 1).trim().toUpperCase();
      
      // Validate test ID is numeric
      if (!testId || !/^\d+$/.test(testId)) {
        debugWarn(`⚠️ Keak: Invalid test ID in ?kv parameter: ${testId}`);
        continue;
      }
      
      // Validate variant is A or B
      if (variant !== "A" && variant !== "B") {
        debugWarn(`⚠️ Keak: Invalid variant in ?kv parameter (must be 'a' or 'b'): ${variant}`);
        continue;
      }
      
      forcedVariants[testId] = variant;
      debugLog(`✅ Keak: Forced variant for test ${testId}: ${variant}`);
    }
    
    if (Object.keys(forcedVariants).length > 0) {
      debugLog(`🎯 Keak: Parsed ${Object.keys(forcedVariants).length} forced variant(s) from ?kv parameter`);
    }
  } catch (error) {
    debugWarn("⚠️ Keak: Error parsing ?kv parameter:", error);
  }
  
  return forcedVariants;
}

// Parse forced variants once at module load and store as module-level variable
const forcedVariants = parseForcedVariants();

/**
 * Get forced variants map (for use by other modules)
 */
function getForcedVariants() {
  return forcedVariants;
}

/**
 * Check if a test has a forced variant from URL parameter
 */
function getForcedVariantForTest(testId) {
  const testIdStr = testId.toString();
  return forcedVariants[testIdStr] || null;
}

/**
 * Select variant for a test using impression-based assignment
 */
function selectVariantForTest(test) {
  // Check for forced variant from URL parameter FIRST (highest priority)
  const forcedVariant = getForcedVariantForTest(test.testId);
  if (forcedVariant) {
    debugLog(`🎯 Keak: Using forced variant ${forcedVariant} for test ${test.testId} (from ?kv parameter)`);
    // Do NOT store forced assignments in localStorage (session-only override)
    return forcedVariant;
  }
  
  // Check stored assignment first
  const stored = window.KeakStorage.getAssignment(test.testId.toString());

  if (stored && stored.version === test.version) {
    // Same version → sticky assignment
    debugLog(
      `⚖️ Keak: Using stored variant ${stored.variantId} for test ${test.testId} (version ${test.version})`
    );
    return stored.variantId;
  }

  // Version changed or first visit → compute new assignment

  if (stored && stored.version !== test.version) {
    debugLog(
      `🔄 Keak: Version changed for test ${test.testId} (${stored.version} → ${test.version}), reassigning`
    );
  }

  // If there's a predetermined winner (SPRT decided), use it
  if (test.sprt && test.sprt.decision === "winner_a") {
    debugLog(`🏆 Keak: SPRT winner A for test ${test.testId}`);
    window.KeakStorage.setAssignment(test.testId.toString(), test.version, "A");
    return "A";
  }

  if (test.sprt && test.sprt.decision === "winner_b") {
    debugLog(`🏆 Keak: SPRT winner B for test ${test.testId}`);
    window.KeakStorage.setAssignment(test.testId.toString(), test.version, "B");
    return "B";
  }

  // Handle new variant introduction (auto-variation)
  if (test.prevWinner && test.variantA && test.variantB) {
    debugLog(
      `🆕 Keak: New variant introduced for test ${test.testId}, prev winner: ${test.prevWinner}`
    );

    // New variant is always the opposite of previous winner
    const newVariant = test.prevWinner === "A" ? "B" : "A";

    // Choose between prevWinner and newVariant based on impressions
    const prevWinnerImpressions =
      test.prevWinner === "A" ? test.variantA.impressions : test.variantB.impressions;
    const newVariantImpressions =
      newVariant === "A" ? test.variantA.impressions : test.variantB.impressions;

    const selected = prevWinnerImpressions <= newVariantImpressions ? test.prevWinner : newVariant;

    debugLog(
      `⚖️ Keak: Assigned ${selected} (prevWinner: ${prevWinnerImpressions} impressions, new: ${newVariantImpressions} impressions)`
    );

    window.KeakStorage.setAssignment(test.testId.toString(), test.version, selected);
    return selected;
  }

  // Standard A/B assignment: choose variant with fewer impressions
  if (test.variantA && test.variantB) {
    const impressionsA = test.variantA.impressions || 0;
    const impressionsB = test.variantB.impressions || 0;

    let selected;

    if (impressionsA < impressionsB) {
      selected = "A";
      debugLog(`⚖️ Keak: Variant A has fewer impressions (${impressionsA} vs ${impressionsB})`);
    } else if (impressionsB < impressionsA) {
      selected = "B";
      debugLog(`⚖️ Keak: Variant B has fewer impressions (${impressionsB} vs ${impressionsA})`);
    } else {
      // Tie - use hash-based deterministic selection for consistency
      selected = hashAssignment(test.testId, getDeviceId()) ? "A" : "B";
      debugLog(
        `⚖️ Keak: Equal impressions (${impressionsA}), using hash-based assignment: ${selected}`
      );
    }

    window.KeakStorage.setAssignment(test.testId.toString(), test.version, selected);
    return selected;
  }

  // Fallback: predetermined winner or default to A
  if (test.winningVariant) {
    debugLog(`🏆 Keak: Using predetermined winner ${test.winningVariant} for test ${test.testId}`);
    window.KeakStorage.setAssignment(test.testId.toString(), test.version, test.winningVariant);
    return test.winningVariant;
  }

  debugWarn(`⚠️ Keak: No variant data found for test ${test.testId}, defaulting to A`);
  window.KeakStorage.setAssignment(test.testId.toString(), test.version, "A");
  return "A";
}

/**
 * Select variant for a group of tests (all tests in group get same variant)
 */
function selectVariantForGroup(tests, groupId) {
  if (!tests || tests.length === 0) {
    debugLog(`⚠️ Keak: No tests in group ${groupId}, defaulting to A`);
    return "A";
  }

  // Check for forced variant from URL parameter FIRST (highest priority)
  // If any test in the group has a forced variant, apply it to all tests in the group
  for (const test of tests) {
    const forcedVariant = getForcedVariantForTest(test.testId);
    if (forcedVariant) {
      debugLog(`🎯 Keak: Using forced variant ${forcedVariant} for group ${groupId} (from test ${test.testId} via ?kv parameter)`);
      // Do NOT store forced assignments in localStorage (session-only override)
      return forcedVariant;
    }
  }

  // Check SPRT decisions first - if all tests have same SPRT winner, use that
  const sprtDecisions = tests.map((test) => test.sprt?.decision);
  const allHaveWinnerA = sprtDecisions.every((decision) => decision === "winner_a");
  const allHaveWinnerB = sprtDecisions.every((decision) => decision === "winner_b");

  if (allHaveWinnerA) {
    debugLog(`🏆 Keak: All tests in group ${groupId} have SPRT winner A`);
    return "A";
  }

  if (allHaveWinnerB) {
    debugLog(`🏆 Keak: All tests in group ${groupId} have SPRT winner B`);
    return "B";
  }

  // If SPRT decisions conflict or are incomplete, aggregate impressions across group
  let totalImpressionsA = 0;
  let totalImpressionsB = 0;

  for (const test of tests) {
    if (test.variantA) {
      totalImpressionsA += test.variantA.impressions || 0;
    }
    if (test.variantB) {
      totalImpressionsB += test.variantB.impressions || 0;
    }
  }

  console.log(
    `📦 Keak: Group ${groupId} aggregated impressions - A: ${totalImpressionsA}, B: ${totalImpressionsB}`
  );

  // Choose variant with fewer total impressions
  let selected;

  if (totalImpressionsA < totalImpressionsB) {
    selected = "A";
    debugLog(
      `⚖️ Keak: Group ${groupId} - Variant A has fewer total impressions (${totalImpressionsA} vs ${totalImpressionsB})`
    );
  } else if (totalImpressionsB < totalImpressionsA) {
    selected = "B";
    debugLog(
      `⚖️ Keak: Group ${groupId} - Variant B has fewer total impressions (${totalImpressionsB} vs ${totalImpressionsA})`
    );
  } else {
    // Tie - use hash-based deterministic selection with groupId for consistency
    selected = hashAssignment(groupId, getDeviceId()) ? "A" : "B";
    debugLog(
      `⚖️ Keak: Group ${groupId} - Equal total impressions (${totalImpressionsA}), using hash-based assignment: ${selected}`
    );
  }

  return selected;
}

/**
 * Select variant for a split test using percentage-based assignment
 */
function selectVariantForSplitTest(test) {
  // Check for forced variant from URL parameter FIRST (highest priority)
  const forcedVariant = getForcedVariantForTest(test.testId);
  if (forcedVariant) {
    debugLog(`🎯 Keak: Using forced variant ${forcedVariant} for split test ${test.testId} (from ?kv parameter)`);
    // Do NOT store forced assignments in localStorage (session-only override)
    return forcedVariant;
  }
  
  // Check stored assignment first
  const stored = window.KeakStorage.getAssignment(test.testId.toString());

  if (stored && stored.variantId) {
    // Sticky assignment - always use stored variant for split tests
    debugLog(`⚖️ Keak: Using stored variant ${stored.variantId} for split test ${test.testId}`);
    return stored.variantId;
  }

  // If there's a predetermined winner (SPRT decided), use it
  if (test.sprt && test.sprt.decision === "winner_a") {
    debugLog(`🏆 Keak: SPRT winner A for split test ${test.testId}`);
    window.KeakStorage.setAssignment(test.testId.toString(), "1", "A");
    return "A";
  }

  if (test.sprt && test.sprt.decision === "winner_b") {
    debugLog(`🏆 Keak: SPRT winner B for split test ${test.testId}`);
    window.KeakStorage.setAssignment(test.testId.toString(), "1", "B");
    return "B";
  }

  // Use percentage-based assignment for ongoing tests
  const splitPercentageA = test.splitPercentageA || 50;
  const splitPercentageB = test.splitPercentageB || 50;

  // Use hash-based assignment with percentages
  const hash = hashAssignment(test.testId, getDeviceId());
  const threshold = splitPercentageA / 100; // Convert percentage to decimal

  const selected = hash < threshold ? "A" : "B";

  console.log(
    `⚖️ Keak: Split test ${test.testId} - Percentage assignment: A=${splitPercentageA}%, B=${splitPercentageB}%, assigned: ${selected}`
  );

  window.KeakStorage.setAssignment(test.testId.toString(), "1", selected);
  return selected;
}

/**
 * Compute assignments for all tests, handling groups
 */
function computeAssignments(embeddedData) {
  const assignments = {};

  if (!embeddedData) {
    return assignments;
  }

  // Process regular variants
  if (embeddedData.variants) {
    // Group tests by groupId
    const testsByGroup = {};
    const ungroupedTests = [];

    for (const variant of embeddedData.variants) {
      if (variant.groupId) {
        const groupId = variant.groupId.toString();
        if (!testsByGroup[groupId]) testsByGroup[groupId] = [];
        testsByGroup[groupId].push(variant);
      } else {
        ungroupedTests.push(variant);
      }
    }

    // Process grouped tests
    for (const groupId in testsByGroup) {
      const tests = testsByGroup[groupId];
      const groupVersion = tests[0].version; // Assume all tests in group share version
      const stored = window.KeakStorage.getGroupAssignment(groupId);

      if (stored && stored.version === groupVersion) {
        // Use stored group assignments
        debugLog(`📦 Keak: Using stored group assignments for group ${groupId}`);
        for (const test of tests) {
          const assignedVariant = stored.assignments[test.testId.toString()];
          if (assignedVariant) {
            assignments[test.testId] = assignedVariant;
          }
        }
      } else {
        // Compute new group assignments atomically
        debugLog(`📦 Keak: Computing new group assignments for group ${groupId}`);
        const groupAssignments = {};

        // Compute variant assignment once for the entire group
        const groupVariant = selectVariantForGroup(tests, groupId);

        // Apply same variant to all tests in group
        for (const test of tests) {
          assignments[test.testId] = groupVariant;
          groupAssignments[test.testId.toString()] = groupVariant;
        }

        window.KeakStorage.setGroupAssignment(groupId, groupVersion, groupAssignments);
      }
    }

    // Process ungrouped tests
    for (const test of ungroupedTests) {
      assignments[test.testId] = selectVariantForTest(test);
    }
  }

  // Process split tests
  if (embeddedData.splitTests) {
    const currentUrl = window.location.href;

    for (const test of embeddedData.splitTests) {
      // Check if user is on variant A or B page
      const matchesVariantA = urlsMatch(currentUrl, test.variantA);
      const matchesVariantB = urlsMatch(currentUrl, test.variantB);

      if (matchesVariantA || matchesVariantB) {
        debugLog(`🔄 Keak: User on split test variant page, assigning for test ${test.testId}`);
        assignments[test.testId] = selectVariantForSplitTest(test);
      } else {
        debugLog(
          `⏸️ Keak: User not on split test variant page, skipping assignment for test ${test.testId}`
        );
      }
    }
  }

  return assignments;
}

/**
 * Check if two URLs match (allowing for query params and hash differences)
 */
function urlsMatch(url1, url2) {
  try {
    const parsed1 = new URL(url1);
    const parsed2 = new URL(url2);

    return parsed1.origin === parsed2.origin && parsed1.pathname === parsed2.pathname;
  } catch (error) {
    return url1 === url2;
  }
}

/**
 * Hash-based deterministic assignment for tie-breaking
 */
function hashAssignment(testId, deviceId) {
  const str = `${deviceId}-${testId}`;
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return Math.abs(hash) / 2147483647; // Normalize to 0-1 range
}

/**
 * Get device ID (synchronized with domManipulator.js logic)
 */
function getDeviceId() {
  const deviceIdData = localStorage.getItem("deviceId");

  if (deviceIdData) {
    try {
      const parsed = JSON.parse(deviceIdData);
      if (parsed.expiry && Date.now() < parsed.expiry) {
        return parsed.value;
      }
    } catch (e) {
      if (deviceIdData && !deviceIdData.startsWith("{")) {
        return deviceIdData;
      }
    }
  }

  // Generate new device ID
  const newId = Math.floor(Math.random() * 10000000).toString();
  const expiryTime = Date.now() + 30 * 24 * 60 * 60 * 1000;

  localStorage.setItem(
    "deviceId",
    JSON.stringify({
      value: newId,
      expiry: expiryTime
    })
  );

  return newId;
}

/**
 * Get cookie value
 */
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const lastPart = parts.pop();
    if (lastPart) {
      const firstPart = lastPart.split(";").shift();
      return firstPart || null;
    }
  }
  return null;
}

// Expose on window for cross-module access
window.KeakAssign = {
  selectVariantForTest,
  selectVariantForSplitTest,
  computeAssignments,
  getForcedVariants
};


// ===================================
// Analytics Module
// ===================================
/**
 * Analytics tracking module for Keak embedded scripts
 * Handles impression and conversion tracking
 */

// Debug utility: use global if available (set by script template), otherwise create local fallback
if (typeof isDebugMode === "undefined") {
  var isDebugMode =
    typeof window !== "undefined" && window.KeakDebug
      ? () => window.KeakDebug.getDebugMode()
      : (() => {
          let cached = null;
          return () => {
            if (cached !== null) return cached;
            if (typeof document !== "undefined" && document.cookie) {
              const cookies = document.cookie.split(";").map((c) => c.trim());
              cached = cookies.some((cookie) => {
                const [name, value] = cookie.split("=").map((s) => s.trim());
                return name === "Keak-debug" && (value === "true" || value === "1");
              });
            } else {
              cached = false;
            }
            return cached;
          };
        })();
}

if (typeof debugLog === "undefined") {
  var debugLog =
    typeof window !== "undefined" && window.KeakDebug
      ? window.KeakDebug.debugLog
      : (...args) => {
          if (isDebugMode()) console.log(...args);
        };
}

if (typeof debugWarn === "undefined") {
  var debugWarn =
    typeof window !== "undefined" && window.KeakDebug
      ? window.KeakDebug.debugWarn
      : (...args) => {
          if (isDebugMode()) console.warn(...args);
        };
}

class KeakAnalytics {
  constructor(config) {
    this.domainId = config.domainId;
    this.host = config.host || "http://localhost:5400";
    this.impressionsLogged = new Set();
    this.conversionsLogged = new Set();
    this.sessionId = this.getSessionId();
    this.deviceId = this.getDeviceId();
    this.clientIP = null;
    this.clientIPInfo = null;
  }

  /**
   * Check if current page is on localhost
   * @returns {boolean} True if on localhost
   */
  isLocalhost() {
    if (typeof window === "undefined") return false;

    const hostname = window.location.hostname;
    return (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "::1" ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.") ||
      (hostname.startsWith("172.") &&
        parseInt(hostname.split(".")[1]) >= 16 &&
        parseInt(hostname.split(".")[1]) <= 31)
    );
  }

  /**
   * Get client IP address using external service
   * @returns {Promise<string|null>} Client IP address or null if failed
   */
  async getClientIP() {
    if (this.clientIP) {
      return this.clientIP;
    }

    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      this.clientIP = data.ip;
      return this.clientIP;
    } catch (error) {
      debugWarn("Keak: Could not get client IP:", error);
      return null;
    }
  }

  /**
   * Get client IP info with geolocation data using external service
   * @returns {Promise<string|null>} IP info JSON string or null if failed
   */
  async getClientIPInfo() {
    if (this.clientIPInfo) {
      return this.clientIPInfo;
    }

    try {
      const response = await fetch("https://ipinfo.io/json");
      const data = await response.json();

      if (!data.country) {
        return null;
      }

      // Format data to match your current external service format
      const ipInfo = {
        ip: data.ip,
        timestamp: new Date().toISOString(),
        country: data.country,
        city: data.city || "Unknown",
        latitude: data.loc ? data.loc.split(",")[0] : "Unknown",
        longitude: data.loc ? data.loc.split(",")[1] : "Unknown"
      };

      this.clientIPInfo = JSON.stringify(ipInfo);
      return this.clientIPInfo;
    } catch (error) {
      debugWarn("Keak: Could not get client IP info:", error);
      return null;
    }
  }

  /**
   * Track impression when variant is shown
   * @param {number} testId - The test ID
   * @param {string} variant - The variant (A or B)
   * @param {string} testPageUrl - The test page URL (optional, for URL validation)
   * @param {string} variantContent - The variant content (optional)
   * @param {boolean} skipUrlCheck - Skip URL validation (for split tests and other test types)
   */
  async trackImpression(
    testId,
    variant,
    testPageUrl = null,
    variantContent = null,
    skipUrlCheck = false
  ) {
    // COMMENTED OUT FOR TESTING - re-enable after testing
    // Skip tracking on localhost
    if (this.isLocalhost()) {
      debugLog(
        `📊 Keak: Skipping impression tracking on localhost for test ${testId}, variant ${variant}`
      );
      return;
    }

    const impressionKey = `${testId}-${variant}-impression`;

    // Only track once per session per test per variant (allow different variants)
    if (this.impressionsLogged.has(impressionKey)) {
      debugLog(`📊 Keak: Impression already tracked for test ${testId}, variant ${variant}`);
      return;
    }

    // URL validation is now handled in domManipulator.js before calling trackImpression
    // This check is kept for backward compatibility with split tests
    if (!skipUrlCheck && testPageUrl && !this.isCurrentPageMatching(testPageUrl)) {
      debugLog(`📊 Keak: Not on test page for test ${testId}, skipping impression`);
      return;
    }

    this.impressionsLogged.add(impressionKey);

    debugLog(`📊 Keak: Tracking impression for test ${testId}, variant ${variant}`);

    try {
      const analyticsData = {
        test_id: testId,
        type: "impression",
        variant: variant === "A" ? "variant_a" : "variant_b",
        device_id: this.deviceId,
        session_id: this.sessionId,
        user_agent: navigator.userAgent,
        os: navigator.platform,
        sh: screen.height,
        sw: screen.width,
        language: navigator.userLanguage || navigator.language,
        timezone: new Date().getTimezoneOffset() / -60,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        connection: navigator.connection?.effectiveType || "unknown",
        referrer: document.referrer || "direct",
        pageLoadTime: performance.timing
          ? performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart
          : 0,
        url: window.location.href,
        timestamp: new Date().toISOString()
      };

      // Cache variant assignment for SPA navigation (only for regular tests)
      if (!skipUrlCheck) {
        this.cacheVariantAssignment(testId, variant);
      }

      // Set keak_test_ cookie for checkout correlation (cross-domain support) - only for Shopify tests
      // This complements keak_assignment_ cookies and ensures checkout pages can read variant data
      const isShopifyTest =
        typeof window.Shopify !== "undefined" || window.KEAK_SHOPIFY_MODE === true;

      if (isShopifyTest) {
        const variantString = variant === "A" ? "variant_a" : "variant_b";
        const testCookieName = `keak_test_${testId}`;
        this.setCookie(testCookieName, variantString, 30); // 30 days expiry
        debugLog(`🍪 Keak: Set checkout correlation cookie: ${testCookieName}=${variantString}`);
      }

      await this.sendAnalytics(analyticsData);
    } catch (error) {
      console.error("❌ Keak: Failed to track impression:", error);
    }
  }

  /**
   * Track conversion when user is on conversion page
   */
  async trackConversion(testId, variant, eventType = "click", conversionPageUrl = null) {
    // COMMENTED OUT FOR TESTING - re-enable after testing
    // Skip tracking on localhost
    if (this.isLocalhost()) {
      debugLog(
        `🎯 Keak: Skipping conversion tracking on localhost for test ${testId}, variant ${variant}`
      );
      return;
    }

    const conversionKey = `${testId}-${variant}-${eventType}`;

    // Only track once per session per test per variant per event type
    if (this.conversionsLogged.has(conversionKey)) {
      debugLog(
        `🎯 Keak: Conversion already tracked for test ${testId}, variant ${variant}, event ${eventType}`
      );
      return;
    }

    // For page_view events, check if we're on the conversion page
    if (
      eventType === "page_view" &&
      conversionPageUrl &&
      !this.isCurrentPageMatching(conversionPageUrl)
    ) {
      debugLog(`🎯 Keak: Not on conversion page for test ${testId}, skipping conversion`);
      return;
    }

    // For page_view events, check if user was assigned to this test
    if (eventType === "page_view") {
      const cachedVariant = this.getCachedVariantAssignment(testId);
      if (cachedVariant) {
        // Variation test - use cached variant
        variant = cachedVariant;
      }
      // Split test - use the passed variantId (already correct)
    }

    this.conversionsLogged.add(conversionKey);

    debugLog(
      `🎯 Keak: Tracking conversion for test ${testId}, variant ${variant}, event ${eventType}`
    );

    try {
      const analyticsData = {
        test_id: testId,
        type: "conversion",
        variant: variant === "A" ? "variant_a" : "variant_b",
        event_type: eventType,
        device_id: this.deviceId,
        session_id: this.sessionId,
        user_agent: navigator.userAgent,
        os: navigator.platform,
        sh: screen.height,
        sw: screen.width,
        language: navigator.userLanguage || navigator.language,
        timezone: new Date().getTimezoneOffset() / -60,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        connection: navigator.connection?.effectiveType || "unknown",
        referrer: document.referrer || "direct",
        url: window.location.href,
        timestamp: new Date().toISOString()
      };

      await this.sendAnalytics(analyticsData);
    } catch (error) {
      console.error("❌ Keak: Failed to track conversion:", error);
    }
  }

  /**
   * Read custom cookie value from page if configured
   * @returns {string|null} Cookie value or null if not found
   */
  getCustomCookieValue() {
    const customCookies = window.KEAK_EMBEDDED_DATA?.customCookies || [];

    if (customCookies.length === 0) {
      debugLog(`🍪 Keak: No custom cookies configured`);
      return null;
    }

    debugLog(
      `🍪 Keak: Checking ${customCookies.length} custom cookie(s):`,
      customCookies.map((c) => c.cookie_name).join(", ")
    );

    // Log what's actually available in document.cookie (only shows non-HttpOnly cookies)
    const rawCookieString = document.cookie;
    debugLog(
      `🍪 Keak: document.cookie contains:`,
      rawCookieString || "(empty - may have HttpOnly cookies that JS cannot read)"
    );

    // Check if document.cookie is empty before processing
    if (!rawCookieString || rawCookieString.trim() === "") {
      debugLog(
        `🍪 Keak: document.cookie is empty - cookies may be HttpOnly or not accessible to JavaScript`
      );
      return null;
    }

    // Split and filter cookies once
    const availableCookies = rawCookieString.split(";").filter((c) => c.trim() !== "");
    debugLog(
      `🍪 Keak: Found ${availableCookies.length} accessible cookie(s):`,
      availableCookies
        .map((c) => c.split("=")[0]?.trim())
        .filter(Boolean)
        .join(", ")
    );

    // Collect all found custom cookies as JSON object
    const foundCookies = {};

    // Try each active custom cookie in order
    for (const cookieConfig of customCookies) {
      if (!cookieConfig.is_active) {
        debugLog(`🍪 Keak: Skipping inactive cookie: ${cookieConfig.cookie_name}`);
        continue;
      }

      try {
        const cookieName = cookieConfig.cookie_name;

        // Try to find the cookie in the available cookies
        for (let i = 0; i < availableCookies.length; i++) {
          let cookie = availableCookies[i].trim();
          if (cookie.startsWith(cookieName + "=")) {
            const value = cookie.substring(cookieName.length + 1).trim();
            if (value) {
              foundCookies[cookieName] = value;
              debugLog(`🍪 Keak: Found custom cookie ${cookieName}: ${value.substring(0, 20)}...`);
              break; // Found this cookie, move to next
            }
          }
        }

        if (!foundCookies[cookieName]) {
          debugLog(
            `🍪 Keak: Cookie ${cookieName} not found in accessible cookies (may be HttpOnly, different domain/path, or not set)`
          );
        }
      } catch (error) {
        debugWarn(`⚠️ Keak: Error reading custom cookie ${cookieConfig.cookie_name}:`, error);
      }
    }

    // Return JSON string if any cookies were found, otherwise null
    if (Object.keys(foundCookies).length > 0) {
      const jsonString = JSON.stringify(foundCookies);
      debugLog(
        `🍪 Keak: Returning ${Object.keys(foundCookies).length} custom cookie(s) as JSON:`,
        jsonString
      );
      return jsonString;
    }

    debugLog(`🍪 Keak: No custom cookie value found, returning null`);
    return null;
  }

  /**
   * Send analytics data to API
   */
  async sendAnalytics(data) {
    const startTime = Date.now();

    try {
      debugLog(
        `🔄 Keak: Sending analytics for test ${data.test_id}, variant ${data.variant}, type ${data.type}`
      );

      // Get client IP and IP info for better location detection
      const clientIP = await this.getClientIP();
      const clientIPInfo = await this.getClientIPInfo();

      if (clientIP) {
        data.ip_address = clientIP;
      }

      if (clientIPInfo) {
        data.ip_info = clientIPInfo;
      }

      // Read custom cookie value if configured
      const customCookieValue = this.getCustomCookieValue();
      // Always set external_cookie_id, even if null (to avoid undefined)
      data.external_cookie_id = customCookieValue || null;

      // Check if this is a split test
      const isSplitTest = window.KEAK_EMBEDDED_DATA?.splitTests?.some(
        (test) => test.testId === data.test_id
      );

      let endpoint, requestData;

      if (isSplitTest) {
        // Route to script service split test analytics endpoint
        endpoint = `${this.host}/api/split-url-tests/${data.test_id}/analytics`;

        // Find the actual variation ID for this split test
        const splitTest = window.KEAK_EMBEDDED_DATA?.splitTests?.find(
          (test) => test.testId === data.test_id
        );
        const variationId = splitTest?.variationId || data.test_id;

        // Split tests require variation_id and all required fields
        requestData = {
          type: data.type,
          variant: data.variant,
          variation_id: variationId,
          os: data.os || "Unknown",
          sh: data.sh || 1080,
          sw: data.sw || 1920,
          language: data.language || "en",
          time_to_conversion: data.time_to_conversion || 0,
          user_agent: data.user_agent || "Unknown",
          device_id: data.device_id,
          session_id: data.session_id,
          external_cookie_id: data.external_cookie_id || null, // Explicitly ensure not undefined
          rage_clicks: data.rage_clicks || 0
        };
      } else {
        // Route to regular test analytics endpoint
        endpoint = `${this.host}/api/events/statistics`;
        requestData = data;
      }

      debugLog(
        `🎯 Keak: Routing to ${isSplitTest ? "split test" : "regular test"} endpoint:`,
        endpoint
      );

      const response = await fetch(endpoint, {
        method: isSplitTest ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });

      const processingTime = Date.now() - startTime;

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error");
        throw new Error(
          `Analytics request failed: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      // Try to parse response for additional info
      let responseData = {};
      try {
        responseData = await response.json();
      } catch (e) {
        // Response might not be JSON, that's ok
      }

      debugLog(
        `✅ Keak: Analytics sent successfully in ${processingTime}ms`,
        responseData.data ? responseData.data : ""
      );
    } catch (error) {
      console.error(`❌ Keak: Failed to send analytics for test ${data.test_id}:`, error);
      console.error("❌ Keak: Analytics data that failed:", data);

      // Don't throw the error to prevent breaking the user experience
    }
  }

  /**
   * Get or create session ID
   */
  getSessionId() {
    let sessionId = sessionStorage.getItem("keak_session_id");
    if (!sessionId) {
      sessionId = "sess_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem("keak_session_id", sessionId);
    }
    return sessionId;
  }

  /**
   * Get or create device ID (consistent with domManipulator.js)
   */
  getDeviceId() {
    // Check localStorage first (with expiry handling)
    const deviceIdData = localStorage.getItem("deviceId");
    if (deviceIdData) {
      try {
        const parsed = JSON.parse(deviceIdData);
        if (parsed.expiry && Date.now() < parsed.expiry) {
          return parsed.value;
        } else {
          // Expired, remove it
          localStorage.removeItem("deviceId");
        }
      } catch (e) {
        // If not JSON, treat as old format and return directly
        if (deviceIdData && !deviceIdData.startsWith("{")) {
          return deviceIdData;
        }
      }
    }

    // Check cookies as fallback
    const cookieDeviceId = this.getCookie("deviceId");
    if (cookieDeviceId) {
      return cookieDeviceId;
    }

    // Generate new numeric device ID (same format as domManipulator)
    const min = 1;
    const max = 10000000;
    const newDeviceId = (Math.floor(Math.random() * (max - min + 1)) + min).toString();

    // Cache device ID for 30 days with expiry
    const expiryTime = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
    localStorage.setItem(
      "deviceId",
      JSON.stringify({
        value: newDeviceId,
        expiry: expiryTime
      })
    );

    // Also set cookie as fallback
    this.setCookie("deviceId", newDeviceId, 30);

    return newDeviceId;
  }

  /**
   * Get cookie value
   */
  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  /**
   * Set cookie value
   */
  setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
  }

  /**
   * Check if current page matches the target URL
   */
  isCurrentPageMatching(targetUrl) {
    if (!targetUrl) return true; // If no target URL, allow tracking

    const currentUrl = window.location.href;
    const currentUrlNormalized = this.normalizeUrl(currentUrl);
    const targetUrlNormalized = this.normalizeUrl(targetUrl);

    // Check exact match only - no substring matching to prevent false positives
    return currentUrlNormalized === targetUrlNormalized;
  }

  /**
   * Normalize URL for comparison (remove trailing slashes, www, etc.)
   * Handles both absolute and relative URLs
   */
  normalizeUrl(url) {
    if (!url) return "";

    try {
      // If URL is relative (starts with /), convert to absolute using current origin
      let absoluteUrl = url;
      if (url.startsWith("/")) {
        absoluteUrl = window.location.origin + url;
      }

      const urlObj = new URL(absoluteUrl);
      let normalized = urlObj.origin + urlObj.pathname;

      // Remove trailing slash
      if (normalized.endsWith("/") && normalized.length > 1) {
        normalized = normalized.slice(0, -1);
      }

      // Remove www prefix for comparison
      normalized = normalized.replace(/^https?:\/\/www\./, "https://");

      return normalized;
    } catch (error) {
      // If URL parsing fails, return original string
      return url;
    }
  }

  /**
   * Cache variant assignment for SPA navigation
   */
  cacheVariantAssignment(testId, variant) {
    const cacheKey = `keak_assignment_${testId}`;
    const cacheData = {
      variant: variant,
      timestamp: Date.now(),
      expiry: Date.now() + 4 * 60 * 60 * 1000 // 4 hours
    };

    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    this.setCookie(cacheKey, JSON.stringify(cacheData), 1); // 1 day cookie fallback
  }

  /**
   * Get cached variant assignment for SPA navigation
   */
  getCachedVariantAssignment(testId) {
    const cacheKey = `keak_assignment_${testId}`;

    // Try localStorage first
    const localStorageData = localStorage.getItem(cacheKey);
    if (localStorageData) {
      try {
        const parsed = JSON.parse(localStorageData);
        if (parsed.expiry && Date.now() < parsed.expiry) {
          return parsed.variant;
        } else {
          // Expired, remove it
          localStorage.removeItem(cacheKey);
        }
      } catch (e) {
        // Invalid JSON, remove it
        localStorage.removeItem(cacheKey);
      }
    }

    // Try cookie fallback
    const cookieData = this.getCookie(cacheKey);
    if (cookieData) {
      try {
        const parsed = JSON.parse(cookieData);
        if (parsed.expiry && Date.now() < parsed.expiry) {
          return parsed.variant;
        }
      } catch (e) {
        // Invalid JSON, ignore
      }
    }

    return null;
  }
}

// Export for use in embedded scripts
window.KeakAnalytics = KeakAnalytics;


// ===================================
// DOM Manipulator Module
// ===================================
/**
 * DOM manipulation module for Keak embedded scripts
 * Handles applying variants to page elements
 */

// Debug utility: use global if available (set by script template), otherwise create local fallback
if (typeof isDebugMode === "undefined") {
  var isDebugMode =
    typeof window !== "undefined" && window.KeakDebug
      ? () => window.KeakDebug.getDebugMode()
      : (() => {
          let cached = null;
          return () => {
            if (cached !== null) return cached;
            if (typeof document !== "undefined" && document.cookie) {
              const cookies = document.cookie.split(";").map((c) => c.trim());
              cached = cookies.some((cookie) => {
                const [name, value] = cookie.split("=").map((s) => s.trim());
                return name === "Keak-debug" && (value === "true" || value === "1");
              });
            } else {
              cached = false;
            }
            return cached;
          };
        })();
}

if (typeof debugLog === "undefined") {
  var debugLog =
    typeof window !== "undefined" && window.KeakDebug
      ? window.KeakDebug.debugLog
      : (...args) => {
          if (isDebugMode()) console.log(...args);
        };
}

if (typeof debugWarn === "undefined") {
  var debugWarn =
    typeof window !== "undefined" && window.KeakDebug
      ? window.KeakDebug.debugWarn
      : (...args) => {
          if (isDebugMode()) console.warn(...args);
        };
}

class KeakDOMManipulator {
  constructor(analytics) {
    this.analytics = analytics;
    this.appliedVariants = new Set();
  }

  /**
   * Apply all embedded variants to the page
   */
  async applyVariants(variants) {
    if (!variants || variants.length === 0) return;

    debugLog("🎨 Keak: Applying", variants.length, "embedded variants to page");

    // Extract all unique selectors and wait for stability once
    const uniqueSelectors = [...new Set(variants.map((v) => v.selector))];
    debugLog(
      "🕐 Keak: Waiting for element stability for",
      uniqueSelectors.length,
      "unique selectors"
    );

    await Promise.all(uniqueSelectors.map((selector) => this.waitForElementStability(selector)));

    debugLog("✅ Keak: All elements stable, applying variants");

    for (const variant of variants) {
      await this.applyVariant(variant, true); // Pass skipStabilityCheck flag
    }
  }

  /**
   * Apply a single variant to the page with React hydration support
   */
  async applyVariant(variant, skipStabilityCheck = false) {
    try {
      // Wait for potential React hydration to complete
      if (!skipStabilityCheck) {
        await this.waitForElementStability(variant.selector, variant.element_signatures);
      }

      // Try to find element with fallback strategies
      const element = this.findElementWithFallback(variant.selector, variant.element_signatures);
      if (!element) {
        debugWarn("⚠️ Keak: Element not found for selector:", variant.selector);
        return;
      }

      // Avoid applying the same variant multiple times
      const variantKey = `${variant.testId}-${variant.selector}`;
      if (this.appliedVariants.has(variantKey)) {
        return;
      }

      this.appliedVariants.add(variantKey);

      let selectedVariant, selectedVariantName, selectedContent, selectedStyles;

      // Debug: Log variant structure
      debugLog("🐛 Keak: Variant structure:", {
        testId: variant.testId,
        hasVariantA: !!variant.variantA,
        hasVariantB: !!variant.variantB,
        isBalancedAssignment: variant.isBalancedAssignment,
        winningVariant: variant.winningVariant,
        hasContent: !!variant.content
      });

      // Handle balanced assignment vs predetermined winner
      if (variant.isBalancedAssignment && variant.variantA && variant.variantB) {
        // Check for forced variant from URL parameter FIRST (highest priority - overrides everything)
        const forcedVariants = window.KeakAssign?.getForcedVariants?.() || {};
        const forcedVariant = forcedVariants[variant.testId.toString()];

        if (forcedVariant) {
          // Forced variant from ?kv parameter - use it and don't store (session-only override)
          selectedVariantName = forcedVariant;
          selectedVariant = selectedVariantName === "A" ? variant.variantA : variant.variantB;
          selectedContent = selectedVariant.content;
          selectedStyles = selectedVariant.styles;

          debugLog(
            `🎯 Keak: Using forced variant ${selectedVariantName} for test ${variant.testId} (from ?kv parameter) - Content: "${selectedContent}"`
          );
        } else {
          // No forced variant - check for stored assignment (sticky assignment)
          const stored = window.KeakStorage?.getAssignment(variant.testId.toString());

          if (stored && variant.version && stored.version === variant.version) {
            // User already assigned with same version - use stored variant (don't reassign for balance)
            selectedVariantName = stored.variantId;
            selectedVariant = selectedVariantName === "A" ? variant.variantA : variant.variantB;
            selectedContent = selectedVariant.content;
            selectedStyles = selectedVariant.styles;

            debugLog(
              `⚖️ Keak: Using stored variant ${selectedVariantName} for test ${variant.testId} (version ${variant.version}) - Content: "${selectedContent}"`
            );
          } else {
            // No stored assignment or version changed - compute balanced assignment
            // This happens when: first visit, new auto variation, manual variant change, or test ended
            if (stored && stored.version !== variant.version) {
              debugLog(
                `🔄 Keak: Version changed for test ${variant.testId} (${stored.version} → ${variant.version}), reassigning`
              );
            }

            selectedVariantName = this.getBalancedVariantAssignment(variant);
            selectedVariant = selectedVariantName === "A" ? variant.variantA : variant.variantB;
            selectedContent = selectedVariant.content;
            selectedStyles = selectedVariant.styles;

            // Store the new assignment
            if (window.KeakStorage && variant.version) {
              window.KeakStorage.setAssignment(
                variant.testId.toString(),
                variant.version,
                selectedVariantName
              );
            }

            debugLog(
              `⚖️ Keak: Balanced assignment variant ${selectedVariantName} for test ${variant.testId} (A: ${variant.variantA.impressions}, B: ${variant.variantB.impressions}) - Content: "${selectedContent}"`
            );
          }
        }
      } else {
        // Predetermined winner or fallback
        selectedVariantName = variant.winningVariant || "A";
        selectedContent = variant.content;
        selectedStyles = variant.styles;

        debugLog(
          `🏆 Keak: Using winning variant ${selectedVariantName} for test ${variant.testId} - Content: "${selectedContent}"`
        );
      }

      // Check if we should apply the variant (only on test page, not conversion page)
      const embeddedData = window.KEAK_EMBEDDED_DATA;
      const hasPageViewEvent =
        embeddedData &&
        embeddedData.conversionEvents &&
        embeddedData.conversionEvents.some(
          (event) => event.eventType === "page_view" && event.testIds.includes(variant.testId)
        );

      let shouldApplyVariant = true;
      if (hasPageViewEvent) {
        // For page_view tests: only apply on test page, not conversion page
        const pageViewEvent = embeddedData.conversionEvents.find(
          (event) => event.eventType === "page_view" && event.testIds.includes(variant.testId)
        );
        if (pageViewEvent && pageViewEvent.pageUrl && variant.pageUrl) {
          // Check if we're on the test page (not the conversion page)
          const isOnTestPage = this.analytics.isCurrentPageMatching(variant.pageUrl);
          const isOnConversionPage = this.analytics.isCurrentPageMatching(pageViewEvent.pageUrl);
          shouldApplyVariant = isOnTestPage && !isOnConversionPage;
          if (!shouldApplyVariant) {
            if (isOnConversionPage) {
              debugLog(
                `🎨 Keak: Skipping variant application on conversion page. Current: ${window.location.href}, Conversion page: ${pageViewEvent.pageUrl}`
              );
            } else {
              debugLog(
                `🎨 Keak: Skipping variant application - not on test page. Current: ${window.location.href}, Test page: ${variant.pageUrl}`
              );
            }
          }
        }
      } else {
        // For other tests: check page URL matching (skip check for multi-page tests)
        if (variant.isMultiPage) {
          // Multi-page tests apply on all pages
          shouldApplyVariant = true;
          debugLog(`🎨 Keak: Multi-page test ${variant.testId} - applying on all pages`);
        } else {
          // Single-page tests: only apply on test page
          shouldApplyVariant = this.analytics.isCurrentPageMatching(variant.pageUrl);
          if (!shouldApplyVariant) {
            debugLog(
              `🎨 Keak: Skipping variant application - not on test page. Current: ${window.location.href}, Expected: ${variant.pageUrl}`
            );
          }
        }
      }

      if (shouldApplyVariant) {
        // Apply content based on test type
        this.applyContent(element, {
          ...variant,
          content: selectedContent,
          styles: selectedStyles
        });

        // Apply styles if present
        if (selectedStyles) {
          this.applyStyles(element, selectedStyles);
        }
      }

      // Track impression with the selected variant (only on the page where test was created)
      if (this.analytics) {
        try {
          // For page_view tests: log impression on the page where test was created (event.page_url)
          // For other tests: log impression on the test page (variant.pageUrl)
          let shouldLogImpression = false;
          let impressionUrl = null;

          // Check if this is a page_view test by looking for conversionEvents in embedded data
          const embeddedData = window.KEAK_EMBEDDED_DATA;
          const hasPageViewEvent =
            embeddedData &&
            embeddedData.conversionEvents &&
            embeddedData.conversionEvents.some(
              (event) => event.eventType === "page_view" && event.testIds.includes(variant.testId)
            );

          if (hasPageViewEvent) {
            // For page_view tests: log impression on the test page (where variant is shown)
            // variant.pageUrl is the test page, conversionPageUrl is the conversion page
            // Only log impression if we're on the test page, not the conversion page
            if (variant.pageUrl && this.analytics.isCurrentPageMatching(variant.pageUrl)) {
              shouldLogImpression = true;
              impressionUrl = variant.pageUrl;
              debugLog(
                `📊 Keak: Page_view test - logging impression on test page: ${variant.pageUrl}`
              );
            } else {
              const pageViewEvent = embeddedData.conversionEvents.find(
                (event) => event.eventType === "page_view" && event.testIds.includes(variant.testId)
              );
              const conversionPageUrl = pageViewEvent?.pageUrl || variant.conversionPageUrl;
              debugLog(
                `📊 Keak: Page_view test - skipping impression. Current: ${window.location.href}, Test page: ${variant.pageUrl}, Conversion page: ${conversionPageUrl}`
              );
            }
          } else {
            // For other tests: log impression on the test page
            if (this.analytics.isCurrentPageMatching(variant.pageUrl)) {
              shouldLogImpression = true;
              impressionUrl = variant.pageUrl;
              debugLog(
                `📊 Keak: Regular test - checking impression on test page: ${variant.pageUrl}`
              );
            }
          }

          if (shouldLogImpression) {
            await this.analytics.trackImpression(
              variant.testId,
              selectedVariantName,
              impressionUrl
            );
            debugLog(
              `📊 Keak: Logged impression for test ${variant.testId} on ${hasPageViewEvent ? "test creation page" : "test page"}`
            );
          } else {
            debugLog(
              `📊 Keak: Skipping impression for test ${variant.testId} - not on correct page`
            );
          }
          // Don't track page_view conversion here - it will be tracked on the conversion page
        } catch (error) {
          console.error(`❌ Keak: Failed to track impression for test ${variant.testId}:`, error);
        }
      }

      // Setup conversion tracking
      this.setupConversionTracking(element, variant, selectedVariantName);

      debugLog("✅ Keak: Applied variant", variant.testId, "to", variant.selector);
    } catch (error) {
      console.error("❌ Keak: Failed to apply variant", variant.testId, ":", error);
    }
  }

  /**
   * Wait for element to stabilize (handles React hydration/re-renders)
   * This version waits for React hydration to complete rather than monitoring content changes
   */
  async waitForElementStability(selector, elementSignatures = null, timeout = 5000) {
    return new Promise((resolve) => {
      // Check if we're in a React environment
      const isReactApp =
        document.querySelector("[data-reactroot]") ||
        document.querySelector("#__next") ||
        document.querySelector("#root");

      if (!isReactApp) {
        // Not a React app - wait for DOM ready + additional delay
        if (document.readyState === "complete") {
          setTimeout(resolve, 1000); // Wait 1 second after page load
        } else {
          window.addEventListener("load", () => {
            setTimeout(resolve, 1000); // Wait 1 second after load event
          });
        }

        // Fallback timeout
        setTimeout(resolve, timeout);
        return;
      }

      // For React apps, wait for the element to exist AND be stable
      let stabilityChecksPassed = 0;
      const requiredStabilityChecks = 10; // More checks to ensure stability
      let lastCheckTime = Date.now();
      let lastElementContent = null;

      const checkReactStability = () => {
        const now = Date.now();

        // Check if the element exists using ONLY the primary selector (no fallbacks)
        let element = null;
        try {
          if (selector) {
            element = document.querySelector(selector);
          }
        } catch (e) {
          // Invalid selector, keep waiting
        }

        if (!element) {
          // Element doesn't exist yet, keep waiting
          stabilityChecksPassed = 0;
          if (now - lastCheckTime < timeout) {
            setTimeout(checkReactStability, 100);
          } else {
            debugWarn("⏰ Keak: Timeout - primary selector not found:", selector);
            resolve();
          }
          return;
        }

        const currentContent = element.textContent;

        // Check if content has stabilized
        if (currentContent === lastElementContent) {
          stabilityChecksPassed++;
          debugLog(
            `🔄 Keak: Element stability check ${stabilityChecksPassed}/${requiredStabilityChecks} passed for ${selector}`
          );

          if (stabilityChecksPassed >= requiredStabilityChecks) {
            debugLog("✅ Keak: Element stable, ready to apply variant");
            resolve();
            return;
          }
        } else {
          // Content changed, reset counter
          stabilityChecksPassed = 0;
          lastElementContent = currentContent;
          debugLog("⏳ Keak: Element content changed, resetting stability checks...");
        }

        // Check timeout
        if (now - lastCheckTime > timeout) {
          debugLog("⏰ Keak: Timeout reached, proceeding with variant application");
          resolve();
          return;
        }

        // Check again in 100ms
        setTimeout(checkReactStability, 100);
      };

      // Start checking after a longer initial delay
      setTimeout(checkReactStability, 500);
    });
  }

  /**
   * Get balanced variant assignment based on impression counts
   * Returns variant with fewer impressions, defaulting to B if no impressions
   */
  getBalancedVariantAssignment(variant) {
    // Check for forced variant from URL parameter FIRST (highest priority)
    const forcedVariants = window.KeakAssign?.getForcedVariants?.() || {};
    const forcedVariant = forcedVariants[variant.testId.toString()];
    if (forcedVariant) {
      debugLog(
        `🎯 Keak: Using forced variant ${forcedVariant} for test ${variant.testId} in balanced assignment (from ?kv parameter)`
      );
      return forcedVariant;
    }

    const impressionsA = variant.variantA.impressions || 0;
    const impressionsB = variant.variantB.impressions || 0;

    // If no impressions yet, default to B first
    if (impressionsA === 0 && impressionsB === 0) {
      debugLog(`🆕 Keak: No impressions yet for test ${variant.testId}, defaulting to variant B`);
      return "B";
    }

    // Return variant with fewer impressions to balance traffic
    if (impressionsA < impressionsB) {
      debugLog(
        `⚖️ Keak: Variant A has fewer impressions (${impressionsA} vs ${impressionsB}) for test ${variant.testId}`
      );
      return "A";
    } else if (impressionsB < impressionsA) {
      debugLog(
        `⚖️ Keak: Variant B has fewer impressions (${impressionsB} vs ${impressionsA}) for test ${variant.testId}`
      );
      return "B";
    } else {
      // Equal impressions - use consistent hash-based assignment to maintain balance
      const deviceId = this.getDeviceId();
      const hash = this.simpleHash(`${deviceId}-${variant.testId}`);
      const selected = hash % 2 === 0 ? "A" : "B";
      debugLog(
        `⚖️ Keak: Equal impressions (${impressionsA}) for test ${variant.testId}, using hash-based assignment: ${selected}`
      );
      return selected;
    }
  }

  /**
   * Get device ID using the same logic as the main script
   */
  getDeviceId() {
    // Check localStorage first (with expiry handling)
    const deviceIdData = localStorage.getItem("deviceId");
    if (deviceIdData) {
      try {
        const parsed = JSON.parse(deviceIdData);
        if (parsed.expiry && Date.now() < parsed.expiry) {
          return parsed.value;
        } else {
          // Expired, remove it
          localStorage.removeItem("deviceId");
        }
      } catch (e) {
        // If not JSON, treat as old format and return directly
        if (deviceIdData && !deviceIdData.startsWith("{")) {
          return deviceIdData;
        }
      }
    }

    // Check cookies as fallback
    const cookieDeviceId = this.getCookie("deviceId");
    if (cookieDeviceId) {
      return cookieDeviceId;
    }

    // Generate new numeric device ID (same format as main script)
    const min = 1;
    const max = 10000000;
    const newDeviceId = (Math.floor(Math.random() * (max - min + 1)) + min).toString();

    // Cache device ID for 30 days with expiry (same as main script)
    const expiryTime = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
    localStorage.setItem(
      "deviceId",
      JSON.stringify({
        value: newDeviceId,
        expiry: expiryTime
      })
    );

    // Also set cookie as fallback
    this.setCookie("deviceId", newDeviceId, 30);

    return newDeviceId;
  }

  /**
   * Get cookie value
   */
  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  /**
   * Set cookie value
   */
  setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
  }

  /**
   * Simple hash function for consistent variant assignment
   */
  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Apply content to element based on test type with React compatibility
   */
  applyContent(element, variant) {
    // Check if element is likely React-managed
    const isReactElement = this.isReactManagedElement(element);

    if (isReactElement) {
      debugLog("⚛️ Keak: Applying variant to React-managed element, using safer methods");
      this.applyContentToReactElement(element, variant);
    } else {
      this.applyContentToRegularElement(element, variant);
    }
  }

  /**
   * Check if element is likely managed by React
   */
  isReactManagedElement(element) {
    // Check for React fiber properties
    // const hasReactFiber = Object.keys(element).some(
    //   (key) => key.startsWith("__reactFiber") || key.startsWith("__reactInternalInstance")
    // );

    // // Check if element is in a React root
    // let parent = element.parentElement;
    // while (parent) {
    //   if (parent.id && (parent.id.includes("__next") || parent.id.includes("root"))) {
    //     return true;
    //   }
    //   if (parent.getAttribute && parent.getAttribute("data-reactroot")) {
    //     return true;
    //   }
    //   parent = parent.parentElement;
    // }

    return false;
  }

  /**
   * Apply content to React-managed elements using safer methods
   * FIXED: Detect complex DOM structures and preserve them
   */
  applyContentToReactElement(element, variant) {
    // For React elements, we need to be VERY careful not to interfere with hydration
    // Strategy: Use a wrapper element that React won't touch

    // FIXED: Check if element has child elements - if so, treat as HTML to preserve structure
    const hasChildElements = element.children && element.children.length > 0;
    const looksLikeHTML = /<[^>]+>/g.test(variant.content);
    const shouldPreserveStructure = hasChildElements || looksLikeHTML;

    // Generic safe nested text replacement for plain-text variants: do NOT destroy structure.
    if (
      !looksLikeHTML &&
      typeof variant.content === "string" &&
      variant.content.trim().length > 0 &&
      (variant.type === "headline" ||
        variant.type === "copy" ||
        variant.type === "CTA" ||
        variant.type === "text")
    ) {
      const replaced = this.replaceMatchingDescendantText(element, variant);
      if (replaced) {
        return; // Already safely updated descendant text
      }
      // If not replaced and element has no children treat as simple text node later.
    }

    switch (variant.type) {
      case "headline":
      case "copy":
      case "CTA":
      case "text":
        // After attempt at nested text replacement, only modify container if no children or HTML required
        if (!shouldPreserveStructure) {
          this.safelyReplaceTextContent(element, variant);
          element.setAttribute("data-keak-modified", "true");
          this.setupMutationObserver(element, variant);
        } else if (looksLikeHTML) {
          // Only inject HTML when variant actually contains markup (avoid destroying interactive descendants for plain text)
          this.safelyReplaceHTMLContent(element, variant);
          element.setAttribute("data-keak-modified", "true");
          this.setupMutationObserver(element, variant);
        }
        break;

      case "image":
        if (element.tagName === "IMG") {
          // For images, src changes are safer
          element.src = variant.content;
          element.setAttribute("data-keak-modified", "true");
        } else {
          element.style.backgroundImage = `url(${variant.content})`;
          element.setAttribute("data-keak-modified", "true");
        }
        break;

      case "html":
        // For HTML content in React, use a wrapper approach
        this.safelyReplaceHTMLContent(element, variant);
        element.setAttribute("data-keak-modified", "true");
        this.setupMutationObserver(element, variant);
        break;

      default:
        if (shouldPreserveStructure) {
          this.safelyReplaceHTMLContent(element, variant);
        } else {
          this.safelyReplaceTextContent(element, variant);
        }
        element.setAttribute("data-keak-modified", "true");
    }
  }

  /**
   * Safely replace text content in React elements without triggering hydration errors
   * FIXED: Preserve DOM structure by detecting if element has children
   */
  safelyReplaceTextContent(element, variant) {
    const newContent = variant.content;

    // Safety checks from old system
    if (!element?.innerHTML?.length || !newContent?.length) {
      debugLog("⚠️ Keak: Skipping content replacement - element or content empty");
      return;
    }

    // Check if it's a style-only test (don't modify content for style-only tests)
    const isStyleTest = variant?.variantA?.content?.trim() === variant?.variantB?.content?.trim();
    if (isStyleTest) {
      debugLog("⚠️ Keak: Skipping content replacement - style-only test detected");
      return;
    }

    // Only modify if content is actually different
    if (element.innerHTML === newContent) {
      debugLog("⚠️ Keak: Skipping content replacement - content already matches");
      return;
    }

    // Check if element has child elements (not just text nodes)
    const hasChildElements = element.children && element.children.length > 0;

    if (hasChildElements) {
      // Element has child elements - preserve structure by using innerHTML if content looks like HTML
      // Otherwise, just set textContent which will flatten but won't break as badly
      const looksLikeHTML = /<[^>]+>/g.test(newContent);
      if (looksLikeHTML) {
        element.innerHTML = newContent;
      } else {
        // Plain text content - set textContent to preserve safety
        element.textContent = newContent;
      }
    } else {
      // Simple text element - safe to replace textContent directly
      element.textContent = newContent;
    }
  }

  /**
   * Safely replace HTML content in React elements
   */
  safelyReplaceHTMLContent(element, variant) {
    const newContent = variant.content;

    // Safety checks from old system
    if (!element?.innerHTML?.length || !newContent?.length) {
      debugLog("⚠️ Keak: Skipping HTML replacement - element or content empty");
      return;
    }

    // Check if it's a style-only test (don't modify content for style-only tests)
    const isStyleTest = variant?.variantA?.content?.trim() === variant?.variantB?.content?.trim();
    if (isStyleTest) {
      debugLog("⚠️ Keak: Skipping HTML replacement - style-only test detected");
      return;
    }

    // Only modify if content is actually different
    if (element.innerHTML === newContent) {
      debugLog("⚠️ Keak: Skipping HTML replacement - content already matches");
      return;
    }

    // Clear existing content - safely handle React race conditions
    while (element.firstChild) {
      try {
        const child = element.firstChild;
        // Double-check the child is still in the element before removing
        if (child.parentNode === element) {
          element.removeChild(child);
        }
      } catch (error) {
        // If removeChild fails, the node was already removed (likely by React)
        // This is safe to ignore - just break the loop
        debugWarn("⚠️ Keak: Child node was removed externally (likely by React):", error.message);
        break;
      }
    }

    // Create a temporary container to parse the HTML
    const temp = document.createElement("div");
    temp.innerHTML = newContent;

    // Move all nodes from temp to element
    while (temp.firstChild) {
      element.appendChild(temp.firstChild);
    }
  }

  /**
   * Apply content to regular (non-React) elements
   * FIXED: Detect complex DOM structures and preserve them
   */
  applyContentToRegularElement(element, variant) {
    // Safety checks from old system
    if (!element?.innerHTML?.length || !variant.content?.length) {
      debugLog("⚠️ Keak: Skipping content replacement - element or content empty");
      return;
    }

    // Check if it's a style-only test (don't modify content for style-only tests)
    const isStyleTest = variant?.variantA?.content?.trim() === variant?.variantB?.content?.trim();
    if (isStyleTest) {
      debugLog("⚠️ Keak: Skipping content replacement - style-only test detected");
      return;
    }

    // Only modify if content is actually different
    if (element.innerHTML === variant.content) {
      debugLog("⚠️ Keak: Skipping content replacement - content already matches");
      return;
    }

    // FIXED: Check if element has child elements - if so, treat as HTML to preserve structure
    const hasChildElements = element.children && element.children.length > 0;
    const looksLikeHTML = /<[^>]+>/g.test(variant.content);
    const shouldPreserveStructure = hasChildElements || looksLikeHTML;

    if (
      typeof variant.content === "string" &&
      !looksLikeHTML &&
      (variant.type === "headline" ||
        variant.type === "copy" ||
        variant.type === "CTA" ||
        variant.type === "text")
    ) {
      const replaced = this.replaceMatchingDescendantText(element, variant);
      if (replaced) {
        return; // Done safely
      }
      // Fall through to container-level change only if simple structure
    }

    switch (variant.type) {
      case "headline":
      case "copy":
      case "CTA":
      case "text":
        if (!shouldPreserveStructure) {
          element.textContent = variant.content;
        } else if (looksLikeHTML) {
          element.innerHTML = variant.content;
        }
        break;

      case "image":
        if (element.tagName === "IMG") {
          element.src = variant.content;
        } else {
          element.style.backgroundImage = `url(${variant.content})`;
        }
        break;

      case "html":
        element.innerHTML = variant.content;
        break;

      default:
        // FIXED: Use innerHTML for complex structures to preserve DOM
        if (shouldPreserveStructure) {
          element.innerHTML = variant.content;
        } else {
          element.textContent = variant.content;
        }
    }
  }

  /**
   * Setup mutation observer to re-apply changes if React overwrites them
   * FIXED: Detect whether to use innerHTML or textContent based on structure
   */
  setupMutationObserver(element, variant) {
    if (element.getAttribute("data-keak-observer-setup")) {
      return; // Already setup
    }
    element.setAttribute("data-keak-observer-setup", "true");

    // FIXED: Determine if we should use innerHTML based on structure
    const hasChildElements = element.children && element.children.length > 0;
    const looksLikeHTML = /<[^>]+>/g.test(variant.content);
    const shouldUseInnerHTML = variant.type === "html" || hasChildElements || looksLikeHTML;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" || mutation.type === "characterData") {
          // Check if our changes were overwritten
          const currentContent = shouldUseInnerHTML ? element.innerHTML : element.textContent;
          if (currentContent !== variant.content && element.getAttribute("data-keak-modified")) {
            debugLog("🔄 Keak: Re-applying variant after React re-render");
            // Re-apply our content
            setTimeout(() => {
              if (shouldUseInnerHTML) {
                element.innerHTML = variant.content;
              } else {
                element.textContent = variant.content;
              }
            }, 10);
          }
        } else if (mutation.type === "attributes" && mutation.attributeName === "style") {
          // CSS-in-JS frameworks often remove/reset inline styles
          // Re-apply styles if they were cleared
          if (variant.styles) {
            debugLog("🎨 Keak: Style attribute changed by CSS-in-JS, re-applying styles");
            setTimeout(() => {
              this.applyStyles(element, variant.styles);
            }, 10);
          }
        }
      });
    });

    observer.observe(element, {
      childList: true,
      characterData: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style"] // Watch for style attribute changes (CSS-in-JS)
    });

    // Clean up observer after 30 seconds (by then React should be stable)
    setTimeout(() => {
      observer.disconnect();
      element.removeAttribute("data-keak-observer-setup");
    }, 30000);
  }

  /**
   * Apply styles to element with !important to override site CSS-in-JS
   * Works with Next.js styled-jsx, styled-components, emotion, etc.
   */
  applyStyles(element, styles) {
    try {
      // Try parsing as JSON first
      const parsedStyles = JSON.parse(styles);
      // Use setProperty with 'important' flag to override CSS-in-JS styles
      for (const property in parsedStyles) {
        const value = parsedStyles[property];
        if (value) {
          element.style.setProperty(property, value, "important");
        }
      }
    } catch (e) {
      // If not JSON, apply as CSS text with !important
      element.style.cssText += "; " + styles;
    }
  }

  /**
   * Find an interactive descendant (button/link/role=button) whose text matches original variant content.
   * This allows changing only the visible label instead of replacing the entire container DOM.
   */
  findInteractiveChildForTextVariant(root, variant) {
    if (!root) return null;
    const originalTexts = [];
    if (variant.variantA?.content) originalTexts.push(variant.variantA.content.trim());
    if (variant.variantB?.content) originalTexts.push(variant.variantB.content.trim());
    const lowerTargets = originalTexts.map((t) => t.toLowerCase());

    const queue = Array.from(root.children || []);
    while (queue.length) {
      const el = queue.shift();
      if (!el) continue;
      const tag = el.tagName;
      const isInteractiveTag = tag === "BUTTON" || tag === "A" || tag === "INPUT";
      const role = el.getAttribute && el.getAttribute("role");
      const isRoleButton = role === "button";
      const text = (el.textContent || "").trim();
      if (text && (isInteractiveTag || isRoleButton)) {
        const lower = text.toLowerCase();
        if (lowerTargets.includes(lower)) {
          return el;
        }
        // Also allow substring match if exact not found
        if (lowerTargets.some((t) => lower.includes(t))) {
          return el;
        }
      }
      // Enqueue children
      queue.push(...Array.from(el.children || []));
    }
    return null;
  }

  /**
   * Replace text in matching descendant text nodes (generic, non-interactive specific).
   * Returns true if any replacement performed. Matches against original variantA/variantB
   * and falls back to first differing text node if exact matches not found.
   */
  replaceMatchingDescendantText(root, variant) {
    if (!root) return false;
    const target = variant.content?.trim();
    if (!target) return false;
    const originals = [];
    if (variant.variantA?.content) originals.push(variant.variantA.content.trim());
    if (variant.variantB?.content) originals.push(variant.variantB.content.trim());
    const originalsLower = originals.map((o) => o.toLowerCase());
    const targetLower = target.toLowerCase();

    let replaced = false;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    const candidates = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const text = node.nodeValue?.trim();
      if (!text) continue;
      candidates.push(node);
    }

    // Exact original match first
    for (const node of candidates) {
      const textLower = node.nodeValue.trim().toLowerCase();
      if (originalsLower.includes(textLower) && textLower !== targetLower) {
        node.nodeValue = target;
        if (node.parentElement) {
          node.parentElement.setAttribute("data-keak-modified", "true");
          this.setupMutationObserver(node.parentElement, { ...variant, content: variant.content });
        }
        replaced = true;
      }
    }

    if (replaced) return true;

    // Substring match second
    for (const node of candidates) {
      const textLower = node.nodeValue.trim().toLowerCase();
      if (originalsLower.some((o) => textLower.includes(o)) && textLower !== targetLower) {
        node.nodeValue = target;
        if (node.parentElement) {
          node.parentElement.setAttribute("data-keak-modified", "true");
          this.setupMutationObserver(node.parentElement, { ...variant, content: variant.content });
        }
        replaced = true;
      }
    }

    return replaced;
  }

  /**
   * Setup conversion tracking for interactive elements
   */
  setupConversionTracking(element, variant, selectedVariant) {
    if (!this.analytics) {
      debugWarn(
        `⚠️ Keak: No analytics available for conversion tracking on test ${variant.testId}`
      );
      return;
    }

    debugLog(
      `🎯 Keak: Setting up conversion tracking for test ${variant.testId}, variant ${selectedVariant}`
    );

    // Track clicks on the element
    const clickHandler = async (event) => {
      try {
        debugLog(`🖱️ Keak: Click detected on test ${variant.testId}, variant ${selectedVariant}`);
        await this.analytics.trackConversion(variant.testId, selectedVariant, "click");
      } catch (error) {
        console.error(
          `❌ Keak: Failed to track click conversion for test ${variant.testId}:`,
          error
        );
      }
    };

    // Remove existing handlers to avoid duplicates
    element.removeEventListener("click", clickHandler);
    element.addEventListener("click", clickHandler);

    // Track form submissions if element is a form or inside a form
    const form = element.closest("form");
    if (form) {
      const submitHandler = async (event) => {
        try {
          debugLog(
            `📋 Keak: Form submit detected on test ${variant.testId}, variant ${selectedVariant}`
          );
          await this.analytics.trackConversion(variant.testId, selectedVariant, "form_submit");
        } catch (error) {
          console.error(
            `❌ Keak: Failed to track form submit conversion for test ${variant.testId}:`,
            error
          );
        }
      };

      form.removeEventListener("submit", submitHandler);
      form.addEventListener("submit", submitHandler);
    }

    // Track hover for engagement metrics (optional) - DISABLED
    // TODO: Uncomment this section if hover engagement tracking is needed in the future
    /*
    let hoverTimeout;
    const hoverHandler = () => {
      hoverTimeout = setTimeout(async () => {
        try {
          debugLog(
            `🖱️ Keak: Hover engagement detected on test ${variant.testId}, variant ${selectedVariant}`
          );
          await this.analytics.trackConversion(variant.testId, selectedVariant, "hover_engagement");
        } catch (error) {
          console.error(
            `❌ Keak: Failed to track hover conversion for test ${variant.testId}:`,
            error
          );
        }
      }, 2000); // Track after 2 seconds of hover
    };

    const hoverEndHandler = () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };

    element.removeEventListener("mouseenter", hoverHandler);
    element.removeEventListener("mouseleave", hoverEndHandler);
    element.addEventListener("mouseenter", hoverHandler);
    element.addEventListener("mouseleave", hoverEndHandler);
    */

    debugLog(`✅ Keak: Conversion tracking setup complete for test ${variant.testId}`);
  }

  /**
   * Check for page_view conversions on current page
   * This should be called on every page load to check if user is on a conversion page
   */
  async checkPageViewConversions(embeddedData) {
    if (!this.analytics || !embeddedData) return;

    const currentUrl = window.location.href;
    debugLog(`🔍 Keak: Checking for page_view conversions on: ${currentUrl}`);

    // Check all conversion events for page_view conversions
    if (embeddedData.conversionEvents && embeddedData.conversionEvents.length > 0) {
      for (const conversionEvent of embeddedData.conversionEvents) {
        if (conversionEvent.eventType === "page_view" && conversionEvent.testIds) {
          // For each test ID in this conversion event
          for (const testId of conversionEvent.testIds) {
            // Find the corresponding test to get the test.conversionPageUrl (conversion page)
            const test = embeddedData.variants.find((v) => v.testId === testId);
            if (test && test.conversionPageUrl) {
              // Check if current page matches the test.conversionPageUrl (conversion page)
              if (this.analytics.isCurrentPageMatching(test.conversionPageUrl)) {
                debugLog(
                  `🎯 Keak: Found page_view conversion match for test ${testId} on conversion page: ${test.conversionPageUrl}`
                );

                // Get cached variant assignment
                const cachedVariant = this.analytics.getCachedVariantAssignment(testId);
                if (cachedVariant) {
                  try {
                    await this.analytics.trackConversion(
                      testId,
                      cachedVariant,
                      "page_view",
                      test.conversionPageUrl
                    );
                    debugLog(
                      `✅ Keak: Logged page_view conversion for test ${testId} on conversion page`
                    );
                  } catch (error) {
                    console.error(
                      `❌ Keak: Failed to track page_view conversion for test ${testId}:`,
                      error
                    );
                  }
                } else {
                  debugLog(
                    `ℹ️ Keak: No cached variant assignment for test ${testId}, skipping page_view conversion`
                  );
                }
              } else {
                debugLog(
                  `🔍 Keak: Not on conversion page for test ${testId}. Current: ${currentUrl}, Expected: ${test.conversionPageUrl}`
                );
              }
            }
          }
        }
      }
    }
  }

  /**
   * Setup click-based conversion tracking
   * This should be called on every page load to set up listeners for click conversion events
   */
  setupClickConversions(embeddedData) {
    if (!this.analytics || !embeddedData) return;

    const currentUrl = window.location.href;
    debugLog(`🖱️ Keak: Setting up click conversion listeners on: ${currentUrl}`);

    // Check all conversion events for click conversions
    if (embeddedData.conversionEvents && embeddedData.conversionEvents.length > 0) {
      for (const conversionEvent of embeddedData.conversionEvents) {
        if (conversionEvent.eventType === "click" && conversionEvent.testIds) {
          // For click events, check if any of the associated tests are split tests
          const hasSplitTest = conversionEvent.testIds.some((testId) =>
            embeddedData.splitTests?.some((st) => st.testId === testId)
          );

          if (hasSplitTest) {
            // For split tests, only set up click listeners if user is on a variant page
            // (variant A or variant B). The stored assignment will be checked when the click happens.
            let shouldSetupForSplitTest = false;
            const splitTestIds = conversionEvent.testIds.filter((testId) =>
              embeddedData.splitTests?.some((st) => st.testId === testId)
            );

            for (const testId of splitTestIds) {
              const splitTest = embeddedData.splitTests?.find((st) => st.testId === testId);
              if (!splitTest) continue;

              // Check if user is on a variant page
              const isOnVariantA =
                splitTest.variantA && this.analytics.isCurrentPageMatching(splitTest.variantA);
              const isOnVariantB =
                splitTest.variantB && this.analytics.isCurrentPageMatching(splitTest.variantB);

              // If this conversion event has a variantPage field, only set up if we're on that variant
              if (conversionEvent.variantPage) {
                if (conversionEvent.variantPage === "A" && isOnVariantA) {
                  shouldSetupForSplitTest = true;
                  debugLog(
                    `✅ Keak: Setting up click listeners for split test ${testId} (control event on variant A)`
                  );
                  break;
                } else if (conversionEvent.variantPage === "B" && isOnVariantB) {
                  shouldSetupForSplitTest = true;
                  debugLog(
                    `✅ Keak: Setting up click listeners for split test ${testId} (variant event on variant B)`
                  );
                  break;
                } else {
                  debugLog(
                    `⏸️ Keak: Skipping click listener for event ${conversionEvent.eventId} - requires variant ${conversionEvent.variantPage} but on ${isOnVariantA ? "A" : isOnVariantB ? "B" : "neither"}`
                  );
                }
              } else {
                // No variantPage specified, use legacy behavior (set up on any variant page)
                if (isOnVariantA || isOnVariantB) {
                  shouldSetupForSplitTest = true;
                  debugLog(
                    `✅ Keak: Setting up click listeners for split test ${testId} (on variant page: ${isOnVariantA ? "A" : "B"})`
                  );
                  break;
                } else {
                  debugLog(
                    `⏸️ Keak: Skipping click listener setup for split test ${testId} - not on variant page (current: ${currentUrl})`
                  );
                }
              }
            }

            if (!shouldSetupForSplitTest) {
              continue; // Skip setting up listeners for this split test
            }
          } else {
            // For regular (non-split) tests, check page URL as before
            if (conversionEvent.pageUrl) {
              if (!this.analytics.isCurrentPageMatching(conversionEvent.pageUrl)) {
                debugLog(
                  `🔍 Keak: Not on conversion page for event ${conversionEvent.eventId}. Current: ${currentUrl}, Expected: ${conversionEvent.pageUrl}`
                );
                continue;
              }
            }
          }

          debugLog(
            `✅ Keak: Setting up click listeners for event ${conversionEvent.eventId}${hasSplitTest ? " (split test)" : ""}`
          );

          // Set up listeners for each query selector
          if (conversionEvent.querySelectors && conversionEvent.querySelectors.length > 0) {
            // Separate split tests from regular tests
            const splitTestIds = [];
            const regularTestIds = [];

            for (const testId of conversionEvent.testIds) {
              // Check if this is a split test
              const isSplitTest = embeddedData.splitTests?.some((st) => st.testId === testId);
              if (isSplitTest) {
                splitTestIds.push(testId);
                debugLog(
                  `🔀 Keak: Found split test ${testId} in click conversion event ${conversionEvent.eventId}`
                );
              } else {
                regularTestIds.push(testId);
              }
            }

            // Build a map of selector -> test IDs (for grouped tests, multiple tests may share same selector)
            const selectorToTestIdsMap = new Map();

            for (const selector of conversionEvent.querySelectors) {
              // Find which regular test(s) this selector belongs to by matching against test's element_query_selector
              const matchingRegularTestIds = [];

              for (const testId of regularTestIds) {
                const test = embeddedData.variants.find((v) => v.testId === testId);
                if (test && test.selector === selector) {
                  matchingRegularTestIds.push(testId);
                }
              }

              // For split tests, always include them for any selector in the conversion event
              // Split tests don't have element selectors - they're URL-based
              const allMatchingTestIds = [...matchingRegularTestIds, ...splitTestIds];

              if (allMatchingTestIds.length > 0) {
                selectorToTestIdsMap.set(selector, allMatchingTestIds);
              } else if (matchingRegularTestIds.length > 0) {
                selectorToTestIdsMap.set(selector, matchingRegularTestIds);
              } else {
                // Fallback: if selector doesn't match any test's selector exactly,
                // it might be a shared selector - include all test IDs (backward compatibility)
                debugWarn(
                  `⚠️ Keak: Selector ${selector} doesn't match any test's element_query_selector, using all test IDs as fallback`
                );
                selectorToTestIdsMap.set(selector, conversionEvent.testIds);
              }
            }

            for (const selector of conversionEvent.querySelectors) {
              try {
                // Find all elements matching the selector
                const elements = document.querySelectorAll(selector);

                if (elements.length === 0) {
                  debugWarn(
                    `⚠️ Keak: No elements found for click conversion selector: ${selector}`
                  );
                  continue;
                }

                // Get the test IDs that this selector belongs to
                const testIdsForSelector = selectorToTestIdsMap.get(selector) || [];

                debugLog(
                  `🎯 Keak: Found ${elements.length} element(s) for click conversion selector: ${selector} (tests: ${testIdsForSelector.join(", ")})`
                );

                // Add click listener to each matching element
                elements.forEach((element) => {
                  const clickHandler = async (event) => {
                    debugLog(
                      `🖱️ Keak: Click detected on conversion element for event ${conversionEvent.eventId}, selector: ${selector}`
                    );

                    // Track conversion only for test IDs that match this selector
                    for (const testId of testIdsForSelector) {
                      // Check if this is a split test
                      const isSplitTest = embeddedData.splitTests?.some(
                        (st) => st.testId === testId
                      );

                      let cachedVariant = null;

                      if (isSplitTest) {
                        // For split tests, get assignment from storage
                        const assignment = window.KeakStorage?.getAssignment(testId.toString());
                        if (assignment && assignment.variantId) {
                          cachedVariant = assignment.variantId;
                          debugLog(
                            `🔀 Keak: Split test ${testId} - variant assignment from storage: ${cachedVariant}`
                          );
                        } else {
                          debugLog(
                            `ℹ️ Keak: Split test ${testId} - no variant assignment found in storage, skipping click conversion`
                          );
                        }
                      } else {
                        // For regular tests, use cached variant assignment
                        cachedVariant = this.analytics.getCachedVariantAssignment(testId);
                      }

                      if (cachedVariant) {
                        try {
                          await this.analytics.trackConversion(testId, cachedVariant, "click");
                          debugLog(
                            `✅ Keak: Logged click conversion for ${isSplitTest ? "split" : "regular"} test ${testId}, variant ${cachedVariant}`
                          );
                        } catch (error) {
                          console.error(
                            `❌ Keak: Failed to track click conversion for test ${testId}:`,
                            error
                          );
                        }
                      } else {
                        debugLog(
                          `ℹ️ Keak: No variant assignment for test ${testId}, skipping click conversion`
                        );
                      }
                    }
                  };

                  // Remove existing handler to avoid duplicates
                  element.removeEventListener("click", clickHandler);
                  element.addEventListener("click", clickHandler);

                  // Mark element as having conversion tracking
                  element.setAttribute("data-keak-conversion-tracking", "true");
                });
              } catch (error) {
                console.error(
                  `❌ Keak: Failed to setup click listener for selector ${selector}:`,
                  error
                );
              }
            }
          } else {
            debugWarn(
              `⚠️ Keak: No query selectors found for click event ${conversionEvent.eventId}`
            );
          }
        }
      }
    }
  }

  /**
   * Handle split URL tests
   */
  async applySplitTests(splitTests) {
    if (!splitTests || splitTests.length === 0) return;

    debugLog("🔄 Keak: Processing", splitTests.length, "embedded split tests");

    const currentUrl = window.location.href;

    for (const test of splitTests) {
      try {
        // Check if current page matches any of the test URLs
        const matchesPageUrl = this.urlsMatch(currentUrl, test.pageUrl);
        const matchesVariantA = this.urlsMatch(currentUrl, test.variantA);
        const matchesVariantB = this.urlsMatch(currentUrl, test.variantB);

        if (matchesPageUrl) {
          // User is on the test page URL - assign variant using assignment logic
          const assignedVariant =
            window.KeakAssign?.selectVariantForSplitTest(test) || test.winningVariant;
          const assignedContent = assignedVariant === "A" ? test.variantA : test.variantB;

          // Track impression for split test
          if (this.analytics) {
            await this.analytics.trackImpression(
              test.testId,
              assignedVariant,
              test.pageUrl,
              assignedContent,
              true
            );
          }

          // For URL tests, redirect if different
          if (
            assignedContent &&
            assignedContent !== currentUrl &&
            !currentUrl.includes(assignedContent)
          ) {
            debugLog(
              "🔀 Keak: Split test",
              test.testId,
              "redirecting to assigned variant:",
              assignedContent
            );

            // Track conversion before redirect
            if (this.analytics) {
              await this.analytics.trackImpression(
                test.testId,
                assignedVariant,
                test.pageUrl,
                null,
                true
              );
              await this.analytics.trackConversion(test.testId, assignedVariant, "url_redirect");
            }

            window.location.href = assignedContent;
            return; // Stop processing other tests since we're redirecting
          }
        } else if (matchesVariantA) {
          // User is on variant A - check assignment (may have been set in computeAssignments)
          const assignment = window.KeakStorage?.getAssignment(test.testId.toString());

          // If assignment exists and it's variant B, redirect
          if (assignment && assignment.variantId === "B") {
            debugLog(
              "🔀 Keak: User assigned to variant B but on variant A - redirecting to",
              test.variantB
            );
            window.location.href = test.variantB;
            return; // Stop processing other tests since we're redirecting
          }

          // User is on correct variant or no assignment yet - log impression
          // If no assignment exists yet, visiting variant A will assign them to A (via computeAssignments)
          debugLog("📊 Keak: User on variant A, logging impression for test", test.testId);
          if (this.analytics) {
            await this.analytics.trackImpression(
              test.testId,
              "A",
              test.pageUrl,
              test.variantA,
              true
            );
          }
        } else if (matchesVariantB) {
          // User is on variant B - check assignment (may have been set in computeAssignments)
          const assignment = window.KeakStorage?.getAssignment(test.testId.toString());

          // If assignment exists and it's variant A, redirect
          if (assignment && assignment.variantId === "A") {
            debugLog(
              "🔀 Keak: User assigned to variant A but on variant B - redirecting to",
              test.variantA
            );
            window.location.href = test.variantA;
            return; // Stop processing other tests since we're redirecting
          }

          // User is on correct variant or no assignment yet - log impression
          // If no assignment exists yet, visiting variant B will assign them to B (via computeAssignments)
          debugLog("📊 Keak: User on variant B, logging impression for test", test.testId);
          if (this.analytics) {
            await this.analytics.trackImpression(
              test.testId,
              "B",
              test.pageUrl,
              test.variantB,
              true
            );
          }
        } else if (test.conversionPageUrl && this.urlsMatch(currentUrl, test.conversionPageUrl)) {
          // User is on conversion page - check if they were assigned to a variant
          debugLog("🎯 Keak: User on conversion page for test", test.testId);

          // Check if user was assigned to this split test
          const assignment = window.KeakStorage?.getAssignment(test.testId.toString());

          if (assignment) {
            // User was assigned - log conversion only (no impression)
            debugLog(
              "✅ Keak: User was assigned to variant",
              assignment.variantId,
              "for test",
              test.testId,
              "- logging conversion"
            );
            if (this.analytics) {
              await this.analytics.trackConversion(test.testId, assignment.variantId, "page_view");
            }
          } else {
            // No assignment - do nothing
            debugLog(
              "ℹ️ Keak: No assignment found for test",
              test.testId,
              "- skipping conversion tracking"
            );
          }
        }
      } catch (error) {
        console.error("❌ Keak: Failed to apply split test", test.testId, ":", error);
      }
    }
  }

  /**
   * Check if two URLs match (allowing for query params and hash differences)
   */
  urlsMatch(url1, url2) {
    try {
      const parsed1 = new URL(url1);
      const parsed2 = new URL(url2);

      return parsed1.origin === parsed2.origin && parsed1.pathname === parsed2.pathname;
    } catch (error) {
      return url1 === url2;
    }
  }

  /**
   * Find element with fallback strategies using element signatures
   */
  findElementWithFallback(primarySelector, elementSignatures) {
    if (!primarySelector && !elementSignatures) return null;

    // 1) Try primary selector first
    try {
      if (primarySelector) {
        const primaryEl = document.querySelector(primarySelector);
        if (primaryEl) {
          debugLog("✅ Keak: Found element via PRIMARY selector:", primarySelector);
          return primaryEl;
        } else {
          debugLog("❌ Keak: Primary selector not found:", primarySelector);
        }
      }
    } catch (e) {
      debugWarn("⚠️ Keak: Invalid primary selector:", primarySelector, e.message);
    }

    // 2) If primary selector fails, try element signatures if available
    if (elementSignatures && elementSignatures.length > 0) {
      debugLog("🔄 Keak: Trying element signatures fallback...");
      const currentSignature = this.pickSignatureForCurrentDevice(elementSignatures);
      if (currentSignature) {
        return this.findElementWithSignatureFallbacks(currentSignature);
      }
    }

    debugWarn("❌ Keak: No element found with any method");
    return null;
  }

  /**
   * Pick the most appropriate signature for the current device
   */
  pickSignatureForCurrentDevice(signatures) {
    if (!signatures || signatures.length === 0) return null;

    // Detect current device type
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    const isDesktop = window.innerWidth > 1024;

    // Try to find exact device match first
    if (isMobile) {
      return (
        signatures.find((s) => s.device_variant === "mobile") ||
        signatures.find((s) => s.device_variant === "tablet") ||
        signatures.find((s) => s.device_variant === "desktop") ||
        signatures[0]
      );
    }

    if (isTablet) {
      return (
        signatures.find((s) => s.device_variant === "tablet") ||
        signatures.find((s) => s.device_variant === "mobile") ||
        signatures.find((s) => s.device_variant === "desktop") ||
        signatures[0]
      );
    }

    if (isDesktop) {
      return (
        signatures.find((s) => s.device_variant === "desktop") ||
        signatures.find((s) => s.device_variant === "tablet") ||
        signatures.find((s) => s.device_variant === "mobile") ||
        signatures[0]
      );
    }

    return signatures[0];
  }

  /**
   * Find element using signature fallback strategies (simplified)
   */
  findElementWithSignatureFallbacks(signature) {
    if (!signature) return null;

    const attrs = signature.element_snapshot?.attributes || {};

    // 1) Try ID first (most stable when present)
    if (attrs.id) {
      try {
        const idSelector = "#" + this.escapeCSS(attrs.id);
        const found = document.querySelector(idSelector);
        if (found) {
          debugLog("✅ Keak: Found via ID:", idSelector);
          return found;
        }
      } catch (e) {}
    }

    // 2) Try backup selectors from the signature
    if (Array.isArray(signature.element_snapshot?.backup_selectors)) {
      debugLog("🔄 Keak: Trying backup selectors:", signature.element_snapshot.backup_selectors);
      for (const sel of signature.element_snapshot.backup_selectors) {
        try {
          const found = document.querySelector(sel);
          if (found) {
            debugLog("✅ Keak: Found via BACKUP selector:", sel);
            return found;
          } else {
            debugLog("❌ Keak: Backup selector not found:", sel);
          }
        } catch (e) {
          debugLog("⚠️ Keak: Invalid backup selector:", sel, e.message);
        }
      }
    }

    return null;
  }

  /**
   * Escape CSS selector special characters
   */
  escapeCSS(str) {
    if (typeof str !== "string") return str;
    return str.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&");
  }
}

// Export for use in embedded scripts
window.KeakDOMManipulator = KeakDOMManipulator;


// ===================================
// Main Initializer Module
// ===================================
// Debug utility: use global if available (set by script template), otherwise create local fallback
if (typeof isDebugMode === "undefined") {
  var isDebugMode =
    typeof window !== "undefined" && window.KeakDebug
      ? () => window.KeakDebug.getDebugMode()
      : (() => {
          let cached = null;
          return () => {
            if (cached !== null) return cached;
            if (typeof document !== "undefined" && document.cookie) {
              const cookies = document.cookie.split(";").map((c) => c.trim());
              cached = cookies.some((cookie) => {
                const [name, value] = cookie.split("=").map((s) => s.trim());
                return name === "Keak-debug" && (value === "true" || value === "1");
              });
            } else {
              cached = false;
            }
            return cached;
          };
        })();
}

if (typeof debugLog === "undefined") {
  var debugLog =
    typeof window !== "undefined" && window.KeakDebug
      ? window.KeakDebug.debugLog
      : (...args) => {
          if (isDebugMode()) console.log(...args);
        };
}

if (typeof debugWarn === "undefined") {
  var debugWarn =
    typeof window !== "undefined" && window.KeakDebug
      ? window.KeakDebug.debugWarn
      : (...args) => {
          if (isDebugMode()) console.warn(...args);
        };
}

/**
 * Test Coordinator to manage multiple tests on the same page
 * Prevents conflicts and duplicate events
 */
class KeakTestCoordinator {
  constructor() {
    this.activeTests = new Set();
    this.elementDetectionQueue = new Map();
  }

  /**
   * Register a test as active
   */
  registerTest(testId, testType) {
    this.activeTests.add({ testId, testType });
    debugLog(
      `📝 Keak: Registered ${testType} test ${testId} (${this.activeTests.size} active tests)`
    );
  }

  /**
   * Queue element detection to avoid running multiple retries simultaneously
   */
  queueElementDetection(selector, callback) {
    if (this.elementDetectionQueue.has(selector)) {
      debugLog(`⏳ Keak: Element detection for ${selector} already queued, skipping duplicate`);
      return;
    }

    this.elementDetectionQueue.set(selector, true);
    callback().finally(() => {
      this.elementDetectionQueue.delete(selector);
    });
  }

  /**
   * Get statistics about active tests
   */
  getStats() {
    return {
      activeTests: this.activeTests.size,
      tests: Array.from(this.activeTests)
    };
  }
}

/**
 * Main Keak initialization module
 * Coordinates analytics, DOM manipulation, and SPA navigation
 * Uses localStorage-based sticky assignments
 */
class KeakInitializer {
  constructor(config) {
    this.config = config;
    this.analytics = new KeakAnalytics(config);
    this.domManipulator = new KeakDOMManipulator(this.analytics);
    this.initialized = false;
    this.embeddedData = null;
    this.assignments = null; // Computed variant assignments
    this.testCoordinator = new KeakTestCoordinator(); // Coordinate multiple tests
  }

  /**
   * Initialize Keak with embedded data
   */
  async initialize(embeddedData) {
    if (this.initialized) {
      debugWarn("⚠️ Keak: Already initialized");
      return;
    }

    this.embeddedData = embeddedData;

    if (!embeddedData) {
      debugWarn("⚠️ Keak: No embedded data found");
      return;
    }

    debugLog(
      `🚀 Keak: Initializing with embedded data (${embeddedData.variants.length} variants, ${embeddedData.splitTests.length} split tests)`
    );

    try {
      // For desktop projects, wait for sync to complete before applying variants
      // This ensures page_url and other metadata is updated first
      if (window.KEAK_CONFIG?.projectUuid && window.KEAK_SYNC_PROMISE) {
        debugLog("⏳ Keak: [INIT] Desktop project detected, waiting for sync to complete...");
        debugLog("⏳ Keak: [INIT] Project UUID:", window.KEAK_CONFIG.projectUuid);
        const waitStartTime = Date.now();
        try {
          await window.KEAK_SYNC_PROMISE;
          const waitDuration = Date.now() - waitStartTime;
          debugLog(
            "✅ Keak: [INIT] Sync completed in",
            waitDuration,
            "ms, proceeding with variant application"
          );
          // Re-read embedded data after sync (it may have been updated)
          if (window.KEAK_EMBEDDED_DATA) {
            this.embeddedData = window.KEAK_EMBEDDED_DATA;
            debugLog(
              "✅ Keak: [INIT] Re-read embedded data after sync:",
              JSON.stringify(this.embeddedData, null, 2)
            );
          }
          debugLog("✅ Keak: [INIT] Embedded data should now have updated pageUrl values");
        } catch (syncError) {
          const waitDuration = Date.now() - waitStartTime;
          debugWarn(
            "⚠️ Keak: [INIT] Sync failed after",
            waitDuration,
            "ms, proceeding with variant application anyway"
          );
          debugWarn("⚠️ Keak: [INIT] Sync error:", syncError);
        }
      } else {
        debugLog("ℹ️ Keak: [INIT] Not a desktop project or sync not required, proceeding directly");
      }

      // Compute variant assignments using localStorage
      this.assignments = window.KeakAssign?.computeAssignments(embeddedData) || {};

      debugLog("📊 Keak: Computed assignments:", this.assignments);

      // Apply tests with computed assignments
      await this.applyTests();

      // Check for page_view conversions on current page
      await this.domManipulator.checkPageViewConversions(embeddedData);

      // Setup click-based conversion tracking
      this.domManipulator.setupClickConversions(embeddedData);

      // Setup SPA navigation support
      this.setupSPANavigationSupport(embeddedData);

      this.initialized = true;
      debugLog("✅ Keak: Initialization complete");
    } catch (error) {
      console.error("❌ Keak: Initialization failed:", error);
    }
  }

  /**
   * Apply all tests to the current page
   * IMPORTANT: Split tests are initialized FIRST as they handle redirects
   */
  async applyTests() {
    if (!this.embeddedData || !this.assignments) return;

    // Log test coordination statistics
    if (this.embeddedData.splitTests.length > 0 || this.embeddedData.variants.length > 0) {
      debugLog(
        `📊 Keak: Coordinating ${this.embeddedData.splitTests.length} split tests and ${this.embeddedData.variants.length} variant tests`
      );
    }

    // Check if we already handled split test redirects in the immediate check
    const alreadyRedirected = this.checkIfAlreadyOnVariant();

    // 1. Initialize split tests FIRST (they handle redirects which must happen before variants)
    // Only apply if we haven't already redirected
    if (this.embeddedData.splitTests.length > 0 && !alreadyRedirected) {
      // Register split tests with coordinator
      this.embeddedData.splitTests.forEach((test) => {
        this.testCoordinator.registerTest(test.testId, "split-url");
      });
      await this.domManipulator.applySplitTests(this.embeddedData.splitTests);
    }

    // Apply regular variants
    await this.domManipulator.applyVariants(this.embeddedData.variants);

    // Always apply split tests for impression tracking (even if redirected)
    if (this.embeddedData.splitTests.length > 0) {
      await this.domManipulator.applySplitTests(this.embeddedData.splitTests);
    }
  }

  /**
   * Check if user is already on a variant page (not the test page)
   */
  checkIfAlreadyOnVariant() {
    if (!this.embeddedData?.splitTests?.length) return false;

    const currentUrl = window.location.href;

    for (const test of this.embeddedData.splitTests) {
      // Check if user is already on variant A or B
      if (urlsMatch(currentUrl, test.variantA) || urlsMatch(currentUrl, test.variantB)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Setup SPA navigation support to check for conversions on route changes
   */
  setupSPANavigationSupport(embeddedData) {
    debugLog("🔄 Keak: Setting up SPA navigation support");

    // Listen for popstate events (back/forward navigation)
    window.addEventListener("popstate", async () => {
      debugLog("🔄 Keak: SPA navigation detected (popstate)");
      await this.domManipulator.checkPageViewConversions(embeddedData);
      this.domManipulator.setupClickConversions(embeddedData);
    });

    // Listen for pushstate/replacestate (programmatic navigation)
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = async function (...args) {
      originalPushState.apply(history, args);
      debugLog("🔄 Keak: SPA navigation detected (pushState)");
      setTimeout(async () => {
        await this.domManipulator.checkPageViewConversions(embeddedData);
        this.domManipulator.setupClickConversions(embeddedData);
      }, 100); // Small delay to ensure DOM is updated
    }.bind(this);

    history.replaceState = async function (...args) {
      originalReplaceState.apply(history, args);
      debugLog("🔄 Keak: SPA navigation detected (replaceState)");
      setTimeout(async () => {
        await this.domManipulator.checkPageViewConversions(embeddedData);
        this.domManipulator.setupClickConversions(embeddedData);
      }, 100); // Small delay to ensure DOM is updated
    }.bind(this);

    // Listen for hash changes
    window.addEventListener("hashchange", async () => {
      debugLog("🔄 Keak: SPA navigation detected (hashchange)");
      await this.domManipulator.checkPageViewConversions(embeddedData);
      this.domManipulator.setupClickConversions(embeddedData);
    });

    debugLog("✅ Keak: SPA navigation support setup complete");
  }
}

// Export for use in embedded scripts
window.KeakInitializer = KeakInitializer;

// Auto-initialize with React hydration support
function initializeKeak() {
  if (window.KEAK_EMBEDDED_DATA && !window.keakInitializer) {
    const config = {
      domainId: window.KEAK_EMBEDDED_DATA.domainId,
      host: window.KEAK_CONFIG?.host || "http://localhost:5400"
    };

    debugLog("🔧 Keak: Embedded data found, initializing...", {
      variants: window.KEAK_EMBEDDED_DATA.variants?.length || 0,
      splitTests: window.KEAK_EMBEDDED_DATA.splitTests?.length || 0
    });

    window.keakInitializer = new KeakInitializer(config);
    window.keakInitializer.initialize(window.KEAK_EMBEDDED_DATA);
  } else if (!window.KEAK_EMBEDDED_DATA) {
    debugLog("⚠️ Keak: No embedded data found, may fall back to legacy script");
  }
}

// Check for immediate split test redirects before React hydration
function checkSplitTestsImmediately() {
  if (!window.KEAK_EMBEDDED_DATA?.splitTests?.length) return false;

  const currentUrl = window.location.href;

  for (const test of window.KEAK_EMBEDDED_DATA.splitTests) {
    // Check if current page matches test page URL
    if (urlsMatch(currentUrl, test.pageUrl)) {
      // Check for forced variant from URL parameter FIRST
      const forcedVariants = window.KeakAssign?.getForcedVariants?.() || {};
      const forcedVariant = forcedVariants[test.testId.toString()];
      
      let assignedVariant;
      if (forcedVariant) {
        debugLog(`🎯 Keak: Using forced variant ${forcedVariant} for split test ${test.testId} in immediate check (from ?kv parameter)`);
        assignedVariant = forcedVariant;
      } else {
        // Get assignment normally
        assignedVariant =
          window.KeakAssign?.selectVariantForSplitTest(test) || test.winningVariant;
      }
      
      const assignedContent = assignedVariant === "A" ? test.variantA : test.variantB;

      // Redirect immediately if needed
      if (
        assignedContent &&
        assignedContent !== currentUrl &&
        !currentUrl.includes(assignedContent)
      ) {
        debugLog("🔀 Keak: Immediate split test redirect to:", assignedContent);
        window.location.href = assignedContent;
        return true; // Indicates redirect happened
      }
    }
  }
  return false; // No redirect needed
}

// Helper function for URL matching (same logic as domManipulator)
function urlsMatch(url1, url2) {
  try {
    const parsed1 = new URL(url1);
    const parsed2 = new URL(url2);
    return parsed1.origin === parsed2.origin && parsed1.pathname === parsed2.pathname;
  } catch (error) {
    return url1 === url2;
  }
}

// Wait for React hydration to complete before applying variants
function waitForReactHydration() {
  // FIRST: Check for immediate split test redirects
  if (checkSplitTestsImmediately()) {
    return; // User is being redirected, stop here
  }

  // Check if we're in a React app
  if (
    document.querySelector("[data-reactroot]") ||
    document.querySelector("#__next") ||
    document.querySelector("#root")
  ) {
    debugLog("🔄 Keak: React app detected, waiting for hydration...");

    // For React apps, we need to wait much longer to ensure hydration is complete
    // and all initial renders have settled
    let hydrationComplete = false;
    let stabilityChecks = 0;
    const requiredStabilityChecks = 5; // Require 5 consecutive stable checks

    function checkStability() {
      // Check for signs of React activity
      const isReactBusy =
        document.querySelector(
          '[data-react-suspense-boundary], [data-testid*="loading"], .loading'
        ) || performance.now() < 2000; // Don't even check in first 2 seconds

      if (!isReactBusy) {
        stabilityChecks++;
        debugLog(`✅ Keak: Stability check ${stabilityChecks}/${requiredStabilityChecks} passed`);

        if (stabilityChecks >= requiredStabilityChecks) {
          if (!hydrationComplete) {
            hydrationComplete = true;
            debugLog("✅ Keak: React hydration complete, initializing...");
            initializeKeak();
          }
          return;
        }
      } else {
        stabilityChecks = 0;
        debugLog("⏳ Keak: React still busy, resetting stability checks...");
      }

      // Continue checking
      setTimeout(checkStability, 200);
    }

    // Strategy 1: Use requestIdleCallback + additional delay
    if (window.requestIdleCallback) {
      window.requestIdleCallback(
        () => {
          setTimeout(checkStability, 1000); // Wait 1 second after idle, then start checking
        },
        { timeout: 3000 }
      );
    } else {
      // Fallback: just use timeout
      setTimeout(checkStability, 2000);
    }

    // Strategy 2: Absolute safety timeout (10 seconds max wait)
    setTimeout(() => {
      if (!hydrationComplete) {
        hydrationComplete = true;
        debugWarn("⏰ Keak: Max wait time reached, initializing anyway");
        initializeKeak();
      }
    }, 10000);
  } else {
    // Not a React app, initialize immediately
    debugLog("🚀 Keak: Non-React app detected, initializing immediately");
    initializeKeak();
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", waitForReactHydration);
} else {
  waitForReactHydration();
}


// ===================================
// Legacy Script Base (with embedded mode check)
// ===================================

// Check if we should run legacy script
function shouldRunLegacyScript() {
  // Never run legacy script if embedded mode is active
  // Legacy script has CORS issues and is deprecated
  if (window.KEAK_EMBEDDED_MODE) {
    debugLog('⚡ Keak: Embedded mode active - skipping legacy script', {
      hasEmbeddedData: !!window.KEAK_EMBEDDED_DATA,
      variantCount: window.KEAK_EMBEDDED_DATA?.variants?.length || 0,
      splitTestCount: window.KEAK_EMBEDDED_DATA?.splitTests?.length || 0
    });
    return false;
  }

  // Only run legacy script if no embedded mode at all
  debugLog('🔧 Keak: Running legacy script mode (no embedded mode)');
  return true;
}

if (shouldRunLegacyScript()) {
  /*! For license information please see keak-script-service.js.LICENSE.txt */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.KeakServices=t():e.KeakServices=t()}(this,()=>(()=>{"use strict";var e={d:(t,i)=>{for(var a in i)e.o(i,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:i[a]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function i(e,t,i=60){const a={value:t,expiry:(new Date).getTime()+60*i*1e3};localStorage.setItem(e,JSON.stringify(a))}function a(e){const t=localStorage.getItem(e);if(!t)return null;try{const i=JSON.parse(t);return(new Date).getTime()>i.expiry?(localStorage.removeItem(e),null):i.value}catch{return localStorage.removeItem(e),null}}function n(){const e=(new Date).getTime(),t=[];for(let i=0;i<localStorage.length;i++){const a=localStorage.key(i);if(a)try{const i=localStorage.getItem(a);if(!i)continue;const n=JSON.parse(i);n.expiry&&e>n.expiry?t.push(a):!/^\d+-\d+-\d+$/.test(a)||n.variation_start_date||n.variant||t.push(a)}catch{/^\d+-\d+-\d+$/.test(a)&&t.push(a)}}t.forEach(e=>localStorage.removeItem(e))}function r(e,t,i=1){s();const a=window.location.hostname.split(".").slice(-2).join("."),n=new Date;n.setTime(n.getTime()+24*i*60*60*1e3);const r="; expires="+n.toUTCString(),o=JSON.stringify({value:t,expires:n.toISOString()});document.cookie=e+"="+encodeURIComponent(o)+r+"; path=/; domain=."+a}function o(){return document.cookie.length}function s(){const e=document.cookie.split(";"),t=["lastStatisticsRequestTime","lastSplitUrlTestImpressionRequestTime","lastSplitUrlTestConversionRequestTime","lastUrlSplitTestVariantSeen","device_id","variant_token","externalCookieId","keak_test_"],i=3500;if(o()>i){const a=["device_id","variant_token","externalCookieId"],n=window.location.hostname.split(".").slice(-2).join(".");for(let t=0;t<e.length;t++){const i=e[t];if(!i)continue;const a=i.split("="),r=a[0],o=a[1];if(!r||!o)continue;const s=r.trim();try{const e=JSON.parse(decodeURIComponent(o));e.expires&&new Date(e.expires)<new Date&&(document.cookie=s+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=."+n)}catch(e){}}if(o()>i)for(let i=0;i<e.length;i++){const r=e[i];if(!r)continue;const o=r.split("=")[0];if(!o)continue;const s=o.trim();t.some(e=>s.startsWith(e))&&!a.includes(s)&&(document.cookie=s+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=."+n)}if(o()>i){const t=e.filter(e=>{if(!e)return!1;const t=e.split("=")[0];if(!t)return!1;const i=t.trim();return/^\d+-\d+-\d+$/.test(i)});t.sort((e,t)=>{const i=e.split("="),a=t.split("="),n=i[0],r=a[0];return n&&r?parseInt(r.split("-")[0]??"0")-parseInt(n.split("-")[0]??"0"):0});for(let e=5;e<t.length;e++){const i=t[e];if(!i)continue;const a=i.split("=")[0];a&&(document.cookie=a.trim()+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=."+n)}}}}function c(e){const t=e+"=",i=document.cookie.split(";");for(let e=0;e<i.length;e++){const a=i[e];if(!a)continue;let n=a;for(;" "===n.charAt(0);)n=n.substring(1,n.length);if(0===n.indexOf(t)){const e=n.substring(t.length,n.length);try{const t=JSON.parse(decodeURIComponent(e));return t.expires&&new Date(t.expires)<new Date?null:t.value}catch(t){return console.error("Error decoding cookie:",t),e}}}return null}function l(){const e=document.getElementById("keak-script-split"),t=e?.getAttribute("data-cookie");return t?(i("externalCookieId",t,43200),r("externalCookieId",t,30),t):a("externalCookieId")||c("externalCookieId")||null}function d(){const e=a("deviceId")||c("deviceId");if(e)return e;{const e=1,t=1e7,a=(Math.floor(Math.random()*(t-e+1))+e).toString();return i("deviceId",a,43200),r("deviceId",a),a}}function u(){const e="sessionId";let t=sessionStorage.getItem(e)||c(e);return t||(t=crypto.randomUUID(),sessionStorage.setItem(e,t),r(e,t,1)),t}function m(e){try{if(!e||"string"!=typeof e)return e;let t=e.trim();return t.startsWith("https://")?t=t.substring(8):t.startsWith("http://")&&(t=t.substring(7)),t.startsWith("www.")&&(t=t.substring(4)),t.endsWith("/")&&(t=t.slice(0,-1)),t=decodeURIComponent(t),t}catch(t){return console.error("Error normalizing URL:",t),e}}function h(e,t){const i=m(e),a=m(t);if(i===a)return!0;try{const e=new URL("http://"+i),t=new URL("http://"+a);return e.hostname===t.hostname&&e.pathname===t.pathname}catch(e){return console.error("Error comparing URLs:",e),!1}}function g(e){if(!e||"string"!=typeof e)return null;try{return new URL(e,window.location.origin)}catch{return null}}function p(e){if(!e)return e;const t=e.split("?")[0];if(!t)return e;const i=t.length>0&&"/"===t[t.length-1]?t.substring(0,t.length-1):t;return decodeURIComponent(i)}function A(e){return e&&"string"==typeof e?function(e){try{return e!==decodeURIComponent(e)}catch{return!1}}(e)?e:encodeURIComponent(e):e}e.r(t),e.d(t,{ServicesManager:()=>U,SplitTestService:()=>b,TestsContentService:()=>R,getServicesManager:()=>x,initializeServices:()=>L,initializeSplitTestService:()=>P,initializeTestsContentService:()=>M,registerService:()=>D,registerServices:()=>N});const f=3e4;function w(e){if(!e)return null;const t=e.id;if(t)return"#"+CSS.escape(t);const i=[];let a=e;for(;a&&a.nodeType===Node.ELEMENT_NODE;){let e=a.nodeName.toLowerCase();const t=a.className;t&&"string"==typeof t&&t.trim().length>0&&(e+=t.split(/\s+/).slice(0,3).map(e=>"."+CSS.escape(e)).join(""));const n=a.parentElement;n&&(e+=":nth-of-type("+(Array.from(n.children).indexOf(a)+1)+")"),i.unshift(e),a=a.parentElement}return i.join(" > ")}function v(e,t){if(!e&&!t)return null;try{if(e&&document.querySelector(e))return e}catch(e){}if(t&&t.length>0&&t[0]?.selector){for(const e of t)if(e.selector)try{if(document.querySelector(e.selector))return e.selector}catch(e){}return null}const i=t?function(e){if(!Array.isArray(e)||0===e.length)return null;const t=function(){const e=window.innerWidth;return e<=767?"mobile":e<=1024?"tablet":"desktop"}();return e.find(e=>e.device_variant===t)||("mobile"===t?e.find(e=>"tablet"===e.device_variant)||e.find(e=>"desktop"===e.device_variant)||e[0]:"tablet"===t?e.find(e=>"desktop"===e.device_variant)||e.find(e=>"mobile"===e.device_variant)||e[0]:"desktop"===t&&(e.find(e=>"tablet"===e.device_variant)||e.find(e=>"mobile"===e.device_variant))||e[0])}(t):null;if(!i)return null;const a=i.element_snapshot||{},n=a.attributes||{};if(n.id)try{const e="#"+CSS.escape(n.id);if(document.querySelector(e))return e}catch{}const r=Object.keys(n).filter(e=>e.startsWith("data-")&&n[e]&&!n[e].match(/^\d+$/)&&!n[e].match(/^[a-f0-9-]{8,}$/)&&n[e].length<50);for(const e of r)try{const t=n[e];if(t){const i="["+e+"='"+CSS.escape(t)+"']";if(document.querySelector(i))return i}}catch{}if(Array.isArray(i.backup_selectors))for(const e of i.backup_selectors)try{if(document.querySelector(e))return e}catch{}const o=(a.tag||"").toLowerCase(),s=Array.isArray(a.classes)?a.classes:[],c=e=>e.match(/^(container|wrapper|content|main|header|footer|nav|section|article)$/)||e.match(/^(flex|grid|block|inline|relative|absolute|fixed|sticky)$/)?3:e.match(/^(rounded|border)(-\w+)?$/)?2:e.match(/^(p-|m-|px-|py-|mx-|my-|w-|h-|text-|font-)/)?1:e.match(/^(bg-|text-.*-|border-.*-|shadow)/)?0:e.match(/^(sm:|md:|lg:|xl:)/)?1:2,l=s.sort((e,t)=>c(t)-c(e));for(let e=1;e<=Math.min(3,l.length);e++){const t=o+"."+l.slice(0,e).map(e=>CSS.escape(e)).join(".");try{const e=document.querySelectorAll(t);if(1===e.length)return t;if(e.length>1&&e.length<=5)for(const t of e){const e=t.textContent?.trim()||"",a=i.text_content?.trim()||"";if(e&&a&&(e.includes(a)||a.includes(e)))return w(t)}}catch{}}if(o)try{const e=document.querySelectorAll(o);if(e.length<=10)for(const t of e){const e=t.textContent?.trim()||"",n=i.text_content?.trim()||"",r=Array.from(t.classList);let o=0;e&&n&&(e===n?o+=3:e.includes(n)||n.includes(e)?o+=2:e.slice(0,20)===n.slice(0,20)&&(o+=1));const c=s.filter(e=>r.includes(e)).length;if(c>=.5*s.length?o+=2:c>=.3*s.length&&(o+=1),a.parent_classes&&t.parentElement){const e=Array.from(t.parentElement.classList);a.parent_classes.filter(t=>e.includes(t)).length>=.7*a.parent_classes.length&&(o+=1)}if(o>=3){const e=w(t);if(e)return e}}}catch{}if(o&&a.parent_classes&&Array.isArray(a.parent_classes)){const e="."+a.parent_classes.map(e=>CSS.escape(e)).join(".")+" > "+o;try{const t=document.querySelectorAll(e);if(t.length>0){const e="number"==typeof a.sibling_index&&t[a.sibling_index]?t[a.sibling_index]:t[0],i=e?w(e):null;if(i)return i}}catch{}if(a.parent_classes.length>0&&a.parent_classes[0])try{const e="."+CSS.escape(a.parent_classes[0])+" > "+o,t=document.querySelectorAll(e);if(t.length>0&&t.length<=5)for(const e of t){const t=e.textContent?.trim()||"",a=i.text_content?.trim()||"";if(t&&a&&t.includes(a)){const t=w(e);if(t)return t}}}catch{}}const d=i.text_content?.trim();if(d&&d.length>0){const e=d.replace(/\s+/g," ").slice(0,80),t=Array.from(document.querySelectorAll(o||"*"));for(const i of t){const t=(i.textContent||"").replace(/\s+/g," ").trim();if(t&&(t.includes(e)||e.includes(t))){const e=w(i);if(e)return e}}}return null}function _(e,t){if(0===e.children.length)e.textContent=t;else{const i=document.createElement("span");i.style.cssText="display: contents;",i.textContent=t;const a=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),n=[];let r;for(;r=a.nextNode();)n.push(r);if(n.length>0){const e=n[0];e?.parentNode&&e.parentNode.replaceChild(i,e);for(let e=1;e<n.length;e++){const t=n[e];t?.parentNode&&t.parentNode.removeChild(t)}}else e.insertBefore(i,e.firstChild)}}function S(e){if(e)return;e=!0;const t=document.getElementById("keak-anti-flicker-overlay");t&&(t.style.opacity="0",setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},100))}function y(e){if(e)return;const t=document.createElement("div");return t.id="keak-anti-flicker-overlay",t.style.cssText="\n    position: fixed !important;\n    top: 0 !important;\n    left: 0 !important;\n    width: 100% !important;\n    height: 100% !important;\n    background: white !important;\n    z-index: 999999 !important;\n    pointer-events: none !important;\n    opacity: 1 !important;\n    transition: opacity 0.1s ease-out !important;\n  ",document.body?document.body.insertBefore(t,document.body.firstChild):document.documentElement.appendChild(t),setTimeout(()=>{S(e)},300),t}function T({userAgent:e,os:t,sw:i,sh:a}){const n=[{name:"Chrome",regex:/Chrome|CriOS/},{name:"Safari",regex:/Safari/},{name:"Firefox",regex:/Firefox/},{name:"Edge",regex:/Edg/},{name:"Opera",regex:/Opera|OPR/},{name:"Samsung Internet",regex:/SamsungBrowser/},{name:"IE",regex:/MSIE|Trident/}];let r=null;for(const t of n)if(t.regex.test(e)){r=t.name;break}const o=768,s=1024;let c=null;const l=parseInt(i,10),d=parseInt(a,10);return isNaN(l)||isNaN(d)||(l<=767?c="mobile":l>=o&&l<=s?c="tablet":l>=1025&&(c="desktop")),{browser:r,deviceType:c}}function C(){const e=Intl.DateTimeFormat().resolvedOptions().timeZone,t=navigator.language||navigator?.userLanguage,i=function(e){return{"Africa/Abidjan":"CI","Africa/Accra":"GH","Africa/Addis_Ababa":"ET","Africa/Algiers":"DZ","Africa/Asmara":"ER","Africa/Bamako":"ML","Africa/Bangui":"CF","Africa/Banjul":"GM","Africa/Bissau":"GW","Africa/Blantyre":"MW","Africa/Brazzaville":"CG","Africa/Bujumbura":"BI","Africa/Cairo":"EG","Africa/Casablanca":"MA","Africa/Ceuta":"ES","Africa/Conakry":"GN","Africa/Dakar":"SN","Africa/Dar_es_Salaam":"TZ","Africa/Djibouti":"DJ","Africa/Douala":"CM","Africa/El_Aaiun":"EH","Africa/Freetown":"SL","Africa/Gaborone":"BW","Africa/Harare":"ZW","Africa/Johannesburg":"ZA","Africa/Juba":"SS","Africa/Kampala":"UG","Africa/Khartoum":"SD","Africa/Kigali":"RW","Africa/Kinshasa":"CD","Africa/Lagos":"NG","Africa/Libreville":"GA","Africa/Lome":"TG","Africa/Luanda":"AO","Africa/Lubumbashi":"CD","Africa/Lusaka":"ZM","Africa/Malabo":"GQ","Africa/Maputo":"MZ","Africa/Maseru":"LS","Africa/Mbabane":"SZ","Africa/Mogadishu":"SO","Africa/Monrovia":"LR","Africa/Nairobi":"KE","Africa/Ndjamena":"TD","Africa/Niamey":"NE","Africa/Nouakchott":"MR","Africa/Ouagadougou":"BF","Africa/Porto-Novo":"BJ","Africa/Sao_Tome":"ST","Africa/Tripoli":"LY","Africa/Tunis":"TN","Africa/Windhoek":"NA","America/Adak":"US","America/Anchorage":"US","America/Anguilla":"AI","America/Antigua":"AG","America/Araguaina":"BR","America/Argentina/Buenos_Aires":"AR","America/Argentina/Catamarca":"AR","America/Argentina/Cordoba":"AR","America/Argentina/Jujuy":"AR","America/Argentina/La_Rioja":"AR","America/Argentina/Mendoza":"AR","America/Argentina/Rio_Gallegos":"AR","America/Argentina/Salta":"AR","America/Argentina/San_Juan":"AR","America/Argentina/San_Luis":"AR","America/Argentina/Tucuman":"AR","America/Argentina/Ushuaia":"AR","America/Aruba":"AW","America/Asuncion":"PY","America/Atikokan":"CA","America/Bahia":"BR","America/Bahia_Banderas":"MX","America/Barbados":"BB","America/Belem":"BR","America/Belize":"BZ","America/Blanc-Sablon":"CA","America/Boa_Vista":"BR","America/Bogota":"CO","America/Boise":"US","America/Cambridge_Bay":"CA","America/Campo_Grande":"BR","America/Cancun":"MX","America/Caracas":"VE","America/Cayenne":"GF","America/Cayman":"KY","America/Chicago":"US","America/Chihuahua":"MX","America/Costa_Rica":"CR","America/Creston":"CA","America/Cuiaba":"BR","America/Curacao":"CW","America/Danmarkshavn":"GL","America/Dawson":"CA","America/Dawson_Creek":"CA","America/Denver":"US","America/Detroit":"US","America/Dominica":"DM","America/Edmonton":"CA","America/Eirunepe":"BR","America/El_Salvador":"SV","America/Fort_Nelson":"CA","America/Fortaleza":"BR","America/Glace_Bay":"CA","America/Godthab":"GL","America/Goose_Bay":"CA","America/Grand_Turk":"TC","America/Grenada":"GD","America/Guadeloupe":"GP","America/Guatemala":"GT","America/Guayaquil":"EC","America/Guyana":"GY","America/Halifax":"CA","America/Havana":"CU","America/Hermosillo":"MX","America/Indiana/Indianapolis":"US","America/Indiana/Knox":"US","America/Indiana/Marengo":"US","America/Indiana/Petersburg":"US","America/Indiana/Tell_City":"US","America/Indiana/Vevay":"US","America/Indiana/Vincennes":"US","America/Indiana/Winamac":"US","America/Inuvik":"CA","America/Iqaluit":"CA","America/Jamaica":"JM","America/Juneau":"US","America/Kentucky/Louisville":"US","America/Kentucky/Monticello":"US","America/Kralendijk":"BQ","America/La_Paz":"BO","America/Lima":"PE","America/Los_Angeles":"US","America/Lower_Princes":"SX","America/Maceio":"BR","America/Managua":"NI","America/Manaus":"BR","America/Marigot":"MF","America/Martinique":"MQ","America/Matamoros":"MX","America/Mazatlan":"MX","America/Menominee":"US","America/Merida":"MX","America/Metlakatla":"US","America/Mexico_City":"MX","America/Miquelon":"PM","America/Moncton":"CA","America/Monterrey":"MX","America/Montevideo":"UY","America/Montserrat":"MS","America/Nassau":"BS","America/New_York":"US","America/Nipigon":"CA","America/Nome":"US","America/Noronha":"BR","America/North_Dakota/Beulah":"US","America/North_Dakota/Center":"US","America/North_Dakota/New_Salem":"US","America/Nuuk":"GL","America/Ojinaga":"MX","America/Panama":"PA","America/Pangnirtung":"CA","America/Paramaribo":"SR","America/Phoenix":"US","America/Port-au-Prince":"HT","America/Port_of_Spain":"TT","America/Porto_Velho":"BR","America/Puerto_Rico":"PR","America/Punta_Arenas":"CL","America/Rainy_River":"CA","America/Rankin_Inlet":"CA","America/Recife":"BR","America/Regina":"CA","America/Resolute":"CA","America/Rio_Branco":"BR","America/Santarem":"BR","America/Santiago":"CL","America/Santo_Domingo":"DO","America/Sao_Paulo":"BR","America/Scoresbysund":"GL","America/Sitka":"US","America/St_Barthelemy":"BL","America/St_Johns":"CA","America/St_Kitts":"KN","America/St_Lucia":"LC","America/St_Thomas":"VI","America/St_Vincent":"VC","America/Swift_Current":"CA","America/Tegucigalpa":"HN","America/Thule":"GL","America/Thunder_Bay":"CA","America/Tijuana":"MX","America/Toronto":"CA","America/Tortola":"VG","America/Vancouver":"CA","America/Whitehorse":"CA","America/Winnipeg":"CA","America/Yakutat":"US","America/Yellowknife":"CA","Antarctica/Casey":"AQ","Antarctica/Davis":"AQ","Antarctica/DumontDUrville":"AQ","Antarctica/Macquarie":"AU","Antarctica/Mawson":"AQ","Antarctica/Palmer":"AQ","Antarctica/Rothera":"AQ","Antarctica/Syowa":"AQ","Antarctica/Troll":"AQ","Antarctica/Vostok":"AQ","Asia/Aden":"YE","Asia/Almaty":"KZ","Asia/Amman":"JO","Asia/Anadyr":"RU","Asia/Aqtau":"KZ","Asia/Aqtobe":"KZ","Asia/Ashgabat":"TM","Asia/Atyrau":"KZ","Asia/Baghdad":"IQ","Asia/Bahrain":"BH","Asia/Baku":"AZ","Asia/Bangkok":"TH","Asia/Barnaul":"RU","Asia/Beirut":"LB","Asia/Bishkek":"KG","Asia/Brunei":"BN","Asia/Chita":"RU","Asia/Choibalsan":"MN","Asia/Colombo":"LK","Asia/Damascus":"SY","Asia/Dhaka":"BD","Asia/Dili":"TL","Asia/Dubai":"AE","Asia/Dushanbe":"TJ","Asia/Famagusta":"CY","Asia/Gaza":"PS","Asia/Hebron":"PS","Asia/Ho_Chi_Minh":"VN","Asia/Hong_Kong":"HK","Asia/Hovd":"MN","Asia/Irkutsk":"RU","Asia/Jakarta":"ID","Asia/Jayapura":"ID","Asia/Jerusalem":"IL","Asia/Kabul":"AF","Asia/Kamchatka":"RU","Asia/Karachi":"PK","Asia/Kathmandu":"NP","Asia/Khandyga":"RU","Asia/Kolkata":"IN","Asia/Krasnoyarsk":"RU","Asia/Kuala_Lumpur":"MY","Asia/Kuching":"MY","Asia/Kuwait":"KW","Asia/Macau":"MO","Asia/Magadan":"RU","Asia/Makassar":"ID","Asia/Manila":"PH","Asia/Muscat":"OM","Asia/Nicosia":"CY","Asia/Novokuznetsk":"RU","Asia/Novosibirsk":"RU","Asia/Omsk":"RU","Asia/Oral":"KZ","Asia/Phnom_Penh":"KH","Asia/Pontianak":"ID","Asia/Pyongyang":"KP","Asia/Qatar":"QA","Asia/Qostanay":"KZ","Asia/Qyzylorda":"KZ","Asia/Riyadh":"SA","Asia/Sakhalin":"RU","Asia/Samarkand":"UZ","Asia/Seoul":"KR","Asia/Shanghai":"CN","Asia/Singapore":"SG","Asia/Srednekolymsk":"RU","Asia/Taipei":"TW","Asia/Tashkent":"UZ","Asia/Tbilisi":"GE","Asia/Tehran":"IR","Asia/Thimphu":"BT","Asia/Tokyo":"JP","Asia/Tomsk":"RU","Asia/Ulaanbaatar":"MN","Asia/Urumqi":"CN","Asia/Ust-Nera":"RU","Asia/Vientiane":"LA","Asia/Vladivostok":"RU","Asia/Yakutsk":"RU","Asia/Yangon":"MM","Asia/Yekaterinburg":"RU","Asia/Yerevan":"AM","Atlantic/Azores":"PT","Atlantic/Bermuda":"BM","Atlantic/Canary":"ES","Atlantic/Cape_Verde":"CV","Atlantic/Faroe":"FO","Atlantic/Madeira":"PT","Atlantic/Reykjavik":"IS","Atlantic/South_Georgia":"GS","Atlantic/St_Helena":"SH","Atlantic/Stanley":"FK","Australia/Adelaide":"AU","Australia/Brisbane":"AU","Australia/Broken_Hill":"AU","Australia/Darwin":"AU","Australia/Eucla":"AU","Australia/Hobart":"AU","Australia/Lindeman":"AU","Australia/Lord_Howe":"AU","Australia/Melbourne":"AU","Australia/Perth":"AU","Australia/Sydney":"AU","Europe/Amsterdam":"NL","Europe/Andorra":"AD","Europe/Astrakhan":"RU","Europe/Athens":"GR","Europe/Belgrade":"RS","Europe/Berlin":"DE","Europe/Bratislava":"SK","Europe/Brussels":"BE","Europe/Bucharest":"RO","Europe/Budapest":"HU","Europe/Busingen":"DE","Europe/Chisinau":"MD","Europe/Copenhagen":"DK","Europe/Dublin":"IE","Europe/Gibraltar":"GI","Europe/Guernsey":"GG","Europe/Helsinki":"FI","Europe/Isle_of_Man":"IM","Europe/Istanbul":"TR","Europe/Jersey":"JE","Europe/Kaliningrad":"RU","Europe/Kiev":"UA","Europe/Kirov":"RU","Europe/Lisbon":"PT","Europe/Ljubljana":"SI","Europe/London":"GB","Europe/Luxembourg":"LU","Europe/Madrid":"ES","Europe/Malta":"MT","Europe/Mariehamn":"AX","Europe/Minsk":"BY","Europe/Monaco":"MC","Europe/Moscow":"RU","Europe/Oslo":"NO","Europe/Paris":"FR","Europe/Podgorica":"ME","Europe/Prague":"CZ","Europe/Riga":"LV","Europe/Rome":"IT","Europe/Samara":"RU","Europe/San_Marino":"SM","Europe/Sarajevo":"BA","Europe/Saratov":"RU","Europe/Simferopol":"UA","Europe/Skopje":"MK","Europe/Sofia":"BG","Europe/Stockholm":"SE","Europe/Tallinn":"EE","Europe/Tirane":"AL","Europe/Ulyanovsk":"RU","Europe/Uzhgorod":"UA","Europe/Vaduz":"LI","Europe/Vatican":"VA","Europe/Vienna":"AT","Europe/Vilnius":"LT","Europe/Volgograd":"RU","Europe/Warsaw":"PL","Europe/Zagreb":"HR","Europe/Zaporozhye":"UA","Europe/Zurich":"CH","Indian/Antananarivo":"MG","Indian/Chagos":"IO","Indian/Christmas":"CX","Indian/Cocos":"CC","Indian/Comoro":"KM","Indian/Kerguelen":"TF","Indian/Mahe":"SC","Indian/Maldives":"MV","Indian/Mauritius":"MU","Indian/Mayotte":"YT","Indian/Reunion":"RE","Pacific/Apia":"WS","Pacific/Auckland":"NZ","Pacific/Bougainville":"PG","Pacific/Chatham":"NZ","Pacific/Easter":"CL","Pacific/Efate":"VU","Pacific/Enderbury":"KI","Pacific/Fakaofo":"TK","Pacific/Fiji":"FJ","Pacific/Funafuti":"TV","Pacific/Galapagos":"EC","Pacific/Gambier":"PF","Pacific/Guadalcanal":"SB","Pacific/Guam":"GU","Pacific/Honolulu":"US","Pacific/Kiritimati":"KI","Pacific/Kosrae":"FM","Pacific/Kwajalein":"MH","Pacific/Majuro":"MH","Pacific/Marquesas":"PF","Pacific/Midway":"UM","Pacific/Nauru":"NR","Pacific/Niue":"NU","Pacific/Norfolk":"NF","Pacific/Noumea":"NC","Pacific/Pago_Pago":"AS","Pacific/Palau":"PW","Pacific/Pitcairn":"PN","Pacific/Pohnpei":"FM","Pacific/Port_Moresby":"PG","Pacific/Rarotonga":"CK","Pacific/Saipan":"MP","Pacific/Tahiti":"PF","Pacific/Tarawa":"KI","Pacific/Tongatapu":"TO","Pacific/Wake":"UM","Pacific/Wallis":"WF"}[e]}(e);return{timezone:e,language:t,country:i||"Unknown"}}function E(e){if(!e)return"";const t=Object.entries(e).filter(([e,t])=>null!=t).map(([e,t])=>`${encodeURIComponent(e)}=${encodeURIComponent(t)}`).join("&");return t?`?${t}`:""}const k="http://localhost:3000/api",I={tests:{list:e=>`${k}/tests${E(e)}`,getVariant:(e,t)=>`${k}/tests/${e}/variant${E(t)}`,analytics:`${k}/tests/analytics`,getNotWorkingSelector:e=>`${k}/tests/${e}/not-working-element-query-selector-email`},events:{statistics:`${k}/events/statistics`},splitUrlTests:{getWithVariant:(e,t)=>`${k}/split-url-tests/${e}/with-variant${E(t)}`,analytics:`${k}/split-url-tests/analytics`,getVisitors:e=>`${k}/split-url-tests/${e}/visitors`,timeAndScrollAnalytics:`${k}/split-url-tests/time-and-scroll-analytics`},script:{get:`${k}/script`}};class R{constructor(e){this.testId=null,this.lastRunTestsTime=0,this.clickEventsRecorded={},this.impressionsLogged=new Map,this.testVariantContent=new Map,this.startTime=Date.now(),this.external_cookie_id=null,this.domain_id=e,this.external_cookie_id=c("externalCookieId")||""}initialize(){this.external_cookie_id=l(),s(),n(),this.setupEventListeners()}setupEventListeners(){this.onHydrationComplete(()=>this.runTests()),this.setupNavigationListeners()}onHydrationComplete(e){(()=>{const t=()=>(window.requestIdleCallback||setTimeout)(e);"complete"===document.readyState?t():window.addEventListener("load",t,{once:!0})})()}setupNavigationListeners(){["pushState","replaceState"].forEach(e=>{const t=history[e],i=()=>this.runTests();history[e]=(...e)=>{const a=t?t.apply(history,e):void 0;return this.onHydrationComplete(i),a}}),window.addEventListener("popstate",()=>{this.onHydrationComplete(()=>this.runTests())})}async getRandomVariantDetails(e,t){this.testId=+e.id;const i=d(),a=new URLSearchParams(window.location.search).get("kv");if(a){const t=a.split(",");for(const i of t){const t=i.trim();if(!t)continue;const a=t.indexOf(":");if(-1===a)continue;const n=t.substring(0,a).trim(),r=t.substring(a+1).trim().toUpperCase();if(n===e.id.toString()&&("A"===r||"B"===r))return{variant_content:("A"===r?e.variations[0]?.variant_a:e.variations[0]?.variant_b)||"",variant:r,styles:"",variation_start_date:e.variations[0]?.start_date}}}const n=t?.toString()+"-"+this.testId+"-"+i,r=localStorage.getItem(n);if(r)try{const t="string"==typeof r?JSON.parse(r):r;if(!t.variation_start_date||!e.variations[0]?.start_date)return t;{const i=new Date(t.variation_start_date);if(!(new Date(e.variations[0].start_date)>i))return t;{localStorage.removeItem(n);const e=window.location.hostname.split(".").slice(-2).join(".");document.cookie=n+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=."+e}}}catch(e){}const o=window.location.href,s=new URL(o),c=s.origin+s.pathname,l=I.tests.getVariant(e.id.toString(),{page_url:c,device_id:i}),u={method:"GET",headers:{"Content-Type":"application/json","X-Timezone":Intl.DateTimeFormat().resolvedOptions().timeZone}};try{const i=await fetch(l,u);if(!i.ok)throw new Error("Network response was not ok: "+i.status+" - "+i.statusText);const a=await i.json();if(a.data){if(t){const t={variant_content:a.data.variant_content,variant:a.data.variant,styles:a.data.styles,variation_start_date:e.variations[0]?.start_date};h(o,e.page_url)&&localStorage.setItem(n,JSON.stringify(t))}return a.data}throw new Error("Response data format is not as expected")}catch(e){throw console.error("Fetch Error:",e),e}}async checkElementExistenceAndSendNotWorkingElementQuerySelectorEmail(e,t,i=null,a=1){if(!t&&!i)return;const n=v(t,i||[]);if(!n||!document.querySelector(n)){const o=function(e){const t=e.split(">").map(e=>e.trim());for(let e=t.length;e>0;e--){const i=t.slice(0,e).join(" > ");try{if(1===document.querySelectorAll(i).length)return i}catch{}}return null}(n||t);if(a>=5&&"true"!==localStorage.getItem("notWorkingElementQuerySelectorEmailSent"+e)){const i=I.tests.getNotWorkingSelector(e),a={method:"POST",body:JSON.stringify({element_query_selector:t,closest_unique_selector:o}),headers:{"Content-Type":"application/json","X-Timezone":Intl.DateTimeFormat().resolvedOptions().timeZone}};try{const t=await fetch(i,a);t.ok||console.warn("Network response was not ok: "+t.status+" - "+t.statusText);const n=await t.json();if(n.data)return localStorage.setItem("notWorkingElementQuerySelectorEmailSent"+e,"true"),r("notWorkingElementQuerySelectorEmailSent"+e,"true"),n.data;console.warn("Response data format is not as expected")}catch(e){console.error("Error checkElementExistenceAndSendNotWorkingElementQuerySelectorEmail: ",e)}return}return void setTimeout(()=>{this.checkElementExistenceAndSendNotWorkingElementQuerySelectorEmail(e,t,i,a+1)},500)}}async logAnalytics(e,t,i,a){const n=void 0!==t?t:this.testId,o=parseInt(localStorage.getItem("lastAnalyticsLogRequestTime"+n)||"0")||0,s=Date.now();if(s-o>=f){const n=void 0!==t?t:this.testId;localStorage.setItem("lastAnalyticsLogRequestTime"+n,s.toString()),r("lastAnalyticsLogRequestTime"+n,s.toString()),n&&this.impressionsLogged.set(n,!0);const o=I.tests.analytics,{browser:c,deviceType:l}=T({userAgent:window.navigator.userAgent,sh:window.screen.height,sw:window.screen.width}),m=C().country,h={method:"POST",body:JSON.stringify({styles:i,test_data:{variant:e,styles:i},type:"impression",test_id:void 0!==t?+t:this.testId,variant:a,user_agent:window.navigator.userAgent,browser:c,device_type:l,device_id:d(),session_id:u(),os:window.navigator?.platform,country:m,sh:window.screen.height,sw:window.screen.width,language:window?.navigator?.userLanguage||window?.navigator?.language,timezone:(new Date).getTimezoneOffset()/-60,viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,connection:window.navigator.connection?.effectiveType||"unknown",referrer:document.referrer||"direct",pageLoadTime:window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart,external_cookie_id:this.external_cookie_id}),headers:{"Content-Type":"application/json","X-Timezone":Intl.DateTimeFormat().resolvedOptions().timeZone}};try{const e=await fetch(o,h);if(!e.ok)throw new Error("Network response was not ok: "+e.status+" - "+e.statusText);const t=await e.json();if(t.data)return t.data.variant_content;throw new Error("Response data format is not as expected")}catch(e){throw console.error("Fetch Error:",e),e}}}async runTests(){const e=Date.now();if(!(e-this.lastRunTestsTime<1e3))if(this.lastRunTestsTime=e,this.isDOMStable()){this.clickEventsRecorded={};try{const e=await this.getTests();await Promise.all(e.map(async e=>{let t,i,a,n=p((window.location.origin+window.location.pathname).replace("www.",""))===p(e.page_url.replace("www.",""));e.is_multi_page&&(n=!0);const o=v(e.element_query_selector,e.element_signatures),s=o?document.querySelector(o):null;if(n){const n=await this.getRandomVariantDetails(e,e.variations[0]?.id||0);t=n.variant_content,i=n.styles,a=n.variant,"headline"===e.type&&o?t=function(e,t,i,a){const n=document.querySelector(e);let r=t?.trim();if(n?.innerHTML?.length>0&&r?.length>0){const e=function(e){const t=Object.keys(e).some(e=>e.startsWith("__reactFiber")||e.startsWith("__reactInternalInstance"));let i=e.parentElement;for(;i;){if(i.id&&(i.id.includes("__next")||i.id.includes("root")))return!0;if(i.getAttribute&&i.getAttribute("data-reactroot"))return!0;i=i.parentElement}return t}(n),o=(i&&i?.length>0&&i?.trim())===(a&&a?.length>0&&a?.trim());if('"'===r[0]&&'"'===r[r.length-1]){const t=r.substring(1,r.length-1);n.innerHTML!==t&&(o||(e?_(n,t):n.innerHTML=t),r=t)}else n.innerHTML===t||o||(e?_(n,t):n.innerHTML=t)}return r}(o,n.variant_content,e.variations[0]?.variant_a,e.variations[0]?.variant_b):o&&function(e,t,i){const a=document.querySelector(e);if(!a||!t?.length)return;const n=window.getComputedStyle(a),r={};for(let e=0;e<n.length;e++){const t=n[e];t&&(r[t]=n.getPropertyValue(t))}if(a.style.backgroundImage||"none"!==n.backgroundImage)return void(a.style.backgroundImage="url('"+t+"')");const o=a;if(o?.src||o?.srcset){if("image"==("mp4"===t.split(".").pop()?"video":"image"))o.src=t,o.hasAttribute("srcset")&&o.removeAttribute("srcset");else if("video"===i){const e=a.parentElement,i=document.createElement("video");for(const e of a.attributes)i.setAttribute(e.name,e.value);i.src=t,i.controls=!1,i.autoplay=!0,i.loop=!0,i.muted=!0;for(const[e,t]of Object.entries(r))i.style[e]=t;e?.replaceChild(i,a)}const e=a.closest("picture");e&&e.querySelectorAll("source").forEach(e=>{e.removeAttribute("srcset")})}else(a.style.backgroundImage||"none"!==n.backgroundImage)&&(a.style.backgroundImage="url('"+t+"')")}(o,n.variant,e.type),i&&"headline"===e.type&&o&&function(e,t){const i=document.querySelector(e);if(i)for(const e in t){const a=t[e];a&&i.style.setProperty(e,a,"important")}}(o,JSON.parse(i)),setTimeout(()=>this.checkElementExistenceAndSendNotWorkingElementQuerySelectorEmail(e.id,e.element_query_selector,e.element_signatures),0),t&&this.testVariantContent.set(e.id,t)}(h(window.location.href,e.page_url)&&s||e.is_multi_page)&&s&&await this.logAnalytics(t||"",e.id,i,a),e.test_events.map(t=>{n&&a&&(localStorage.setItem("lastVariantSeen"+e.id,a),r("lastVariantSeen"+e.id,a));const o=localStorage.getItem("lastVariantSeen"+e.id)||c("lastVariantSeen"+e.id);o&&("click"==t.event.type?t.event.query_selectors?.map(a=>{a.query_selector&&this.runClickTest(e.id,t.event.id,a.query_selector,o,i)}):this.runViewTest(e,t.event,o,i))})}))}catch(e){console.error(e)}}else setTimeout(()=>this.runTests(),100)}isDOMStable(){const e=document.querySelectorAll("#__next, [data-reactroot], #root");for(const t of e)if(0===t.children.length)return!1;return!(document.querySelectorAll('[data-react-suspense], .react-loading, [data-testid*="loading"]').length>0||Date.now()-this.startTime<500)}async getTests(){const e=I.tests.list({domain_id:this.domain_id,path:p(window.location.origin+window.location.pathname)}),t={method:"GET",headers:{"Content-Type":"application/json","X-Timezone":Intl.DateTimeFormat().resolvedOptions().timeZone}};try{const i=await fetch(e,t),a=await i.json();if(a.data)return a.data;throw new Error("Response data format is not as expected")}catch(e){throw e}}runClickTest(e,t,i,a,n){let r=null;if(i.includes("::shadow::")){const[e,t]=i.split("::shadow::");if(e&&t){const i=document.querySelector(e);i&&i.shadowRoot&&(r=i.shadowRoot.querySelector(t))}}else r=document.querySelector(i);r&&r.addEventListener("click",async i=>{await this.updateEventStatistics("click",t,e,a,n,i)})}async updateEventStatistics(e,t,i,a,n,o){if("impression"!==e&&!this.impressionsLogged.has(i)){const e=this.testVariantContent.get(i);try{await this.logAnalytics(e||"",i,n,a)}catch(e){console.error("Error logging impression before conversion:",e)}}const s=parseInt(localStorage.getItem("lastStatisticsRequestTime"+t)||"0")||0,c=Date.now();if("click"===e){const e=i+"-"+t;if(this.clickEventsRecorded[e])return;this.clickEventsRecorded[e]=!0}else{if(c-s<6e4)return;localStorage.setItem("lastStatisticsRequestTime"+t,c.toString()),r("lastStatisticsRequestTime"+t,c.toString())}if("impression"===e&&(void 0!==window.Shopify||!0===window.KEAK_SHOPIFY_MODE)){const e=`keak_test_${i}`;r(e,a,30),console.log(`[Shopify] Set cookie for test ${i}: ${e}=${a}`)}const l=I.events.statistics,{browser:d,deviceType:u}=T({userAgent:window.navigator.userAgent,sh:window.screen.height,sw:window.screen.width}),m=C().country,h={method:"PUT",body:JSON.stringify({type:e,event_id:t,test_id:+i,variant:a,styles:n,country:m,test_data:{variant:a,styles:n},user_agent:window.navigator.userAgent,os:window.navigator?.platform,sh:window.screen.height,sw:window.screen.width,browser:d,device_type:u,time_to_conversion:(new Date).getTime()-this.startTime,language:window?.navigator?.userLanguage||window?.navigator?.language,timezone:(new Date).getTimezoneOffset()/-60,viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,connection:window.navigator.connection?.effectiveType||"unknown",referrer:document.referrer||"direct",pageLoadTime:window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart,external_cookie_id:this.external_cookie_id}),headers:{"Content-Type":"application/json","X-Timezone":Intl.DateTimeFormat().resolvedOptions().timeZone}};if("click"===e&&o&&o.target?.href){o.preventDefault();try{await fetch(l,h)}catch(e){console.error("Fetch error:",e)}window.location.href=o.target.href}else try{await fetch(l,h)}catch(e){console.error("Fetch error:",e)}}runViewTest(e,t,i,a){const n=window.location.href,r=t.page_url;let o=!1;if(r&&r.includes("*")){const e=r.split("*");if(e.length>1){const t=m(e[0]||""),i=m(e[1]||"");o=m(n).includes(t)&&m(n).includes(i)}}if(h(n,r??"")||o)try{const n=this.updateEventStatistics(t.type,t.id,e.id,i,a);if(n)return n}catch(e){throw e}}}class b{constructor(e,t){this.variant="",this.test=null,this.testProcessed=!1,this.impressionLogged=!1,this.criteria_match=!1,this.lastRunTestTime=0,this.flickerOverlayRemoved=!1,this.active_time_spent=0,this.RAGE_CLICK_THRESHOLD=5,this.ALLOWED_RAGE_CLICK_INTERVAL=5e3,this.RAGE_CLICK_TIMEFRAME=999,this.RAGE_CLICK_RADIUS=30,this.click_buffer=[],this.maximum_scroll_depth=0,this.test_id=e,this.API_HOST=t,this.start_time=Date.now(),this.last_analytics_report_time=this.start_time}initialize(){this.external_cookie_id=l(),s(),n(),document.addEventListener("mousemove",()=>{this.active_time_spent+=1}),document.addEventListener("keypress",()=>{this.active_time_spent+=1}),document.addEventListener("click",async e=>{this.active_time_spent+=1;const t=(new Date).getTime();if(this.click_buffer.push({x:e.clientX,y:e.clientY,time:t}),this.click_buffer=this.click_buffer.filter(e=>t-e.time<=this.RAGE_CLICK_TIMEFRAME),this.click_buffer.length>=this.RAGE_CLICK_THRESHOLD){const e=this.click_buffer[0];if(!e)return;if(this.click_buffer.every(t=>Math.abs(t.x-e.x)<=this.RAGE_CLICK_RADIUS&&Math.abs(t.y-e.y)<=this.RAGE_CLICK_RADIUS)&&this.criteria_match&&(this.LAST_RAGE_CLICK_RECORD_TIME&&t-this.LAST_RAGE_CLICK_RECORD_TIME<=this.ALLOWED_RAGE_CLICK_INTERVAL||!this.LAST_RAGE_CLICK_RECORD_TIME)){const e={id:this.test_id,type:"rage_click",variant:this.variant===this.test?.variations[0]?.variant_a?"variant_a":"variant_b",time_to_conversion:t-this.start_time,variation_id:this.test?.variations[0]?.id,user_agent:window.navigator.userAgent,os:window.navigator?.platform,rage_clicks:this.click_buffer.length,sh:window.screen.height,sw:window.screen.width,language:window.navigator?.userLanguage||window.navigator?.language};await this.recordAnalytics(e),this.LAST_RAGE_CLICK_RECORD_TIME=t,this.click_buffer=[]}}}),setInterval(async()=>{localStorage.setItem("last_active_time",(new Date).getTime().toString()),r("last_active_time",(new Date).getTime().toString())},2500),document.addEventListener("scroll",()=>{const e=window.scrollY;this.maximum_scroll_depth=Math.max(this.maximum_scroll_depth,e)}),y(this.flickerOverlayRemoved),"loading"!==document.readyState?this.runTheSplitUrlTest():document.addEventListener("DOMContentLoaded",()=>this.runTheSplitUrlTest());const e=history.pushState;history.pushState=(t,i,a)=>(this.flickerOverlayRemoved=!1,y(this.flickerOverlayRemoved),this.runTheSplitUrlTest(),e.call(history,t,i,a))}async reportTimeAndScrollAnalytics(e,t){const i=I.splitUrlTests.timeAndScrollAnalytics,a={method:"POST",body:JSON.stringify({id:this.test_id,variant:this.variant,scroll_depth:t,active_time_spent:e,page_dwell_time:e}),headers:{"Content-Type":"application/json"}};try{const e=await fetch(i,a),t=await e.json();if(t.data)return t.data;throw new Error("Response data format is not as expected")}catch(e){throw e}}async runTheSplitUrlTest(){if(!this.test_id||""===this.test_id.trim())return;if(this.testProcessed)return;if(new URLSearchParams(window.location.search).has("referrer"))return this.testProcessed=!0,void S(this.flickerOverlayRemoved);if((a("variant_token")||c("variant_token"))&&this.impressionLogged)return this.testProcessed=!0,void S(this.flickerOverlayRemoved);const e=Date.now();if(!(e-this.lastRunTestTime<1e3)){this.lastRunTestTime=e;try{const e=await this.getTheSplitURLTest(this.test_id);if(e.criteria[0]&&!this.checkTestCriteria(e.criteria[0]))return this.criteria_match=!1,void S(this.flickerOverlayRemoved);this.criteria_match=!0,i("lastUrlSplitTestVariantSeen",this.variant,240),r("lastUrlSplitTestVariantSeen",this.variant,1);const t=e.events[0]?.event;t&&await this.runConversionEvent(t,this.variant);const a=Date.now(),n=parseInt(localStorage.getItem("lastSplitUrlTestImpressionRequestTime"+this.test_id)||"0")||parseInt(c("lastSplitUrlTestImpressionRequestTime"+this.test_id)||"0")||0;if(!this.impressionLogged&&a-n>=f){const t={id:this.test_id,type:"impression",variation_id:e.variations[0]?.id,time_to_conversion:(new Date).getTime()-this.start_time,variant:this.variant===e.variations[0]?.variant_a?"variant_a":"variant_b",event_id:e.events[0]?.event?.id,device_id:d(),session_id:u(),user_agent:window.navigator.userAgent,os:window.navigator?.platform,sh:window.screen.height,sw:window.screen.width,language:window.navigator?.userLanguage||window.navigator?.language,timezone:(new Date).getTimezoneOffset()/-60,viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,connection:window.navigator.connection?.effectiveType||"unknown",referrer:document.referrer||"direct",pageLoadTime:window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart,external_cookie_id:this.external_cookie_id};await this.recordAnalytics(t),await this.updateVariantVisitors(),localStorage.setItem("lastSplitUrlTestImpressionRequestTime"+this.test_id,a.toString()),r("lastSplitUrlTestImpressionRequestTime"+this.test_id,a.toString(),1),this.impressionLogged=!0}const o=function(e){const t=g(e);return t?t.origin+t.pathname:""}(this.variant),s=window.location.origin+window.location.pathname;if(p(e.page_url?.replace("www.",""))===p(window.location.href?.replace("www.","")))if(p(s)!==p(o)){const t=g(this.variant),i=t?t.search:"";location.replace(p(this.variant)+(i?"&referrer="+A(e.page_url):"?referrer="+A(e.page_url)))}else{this.testProcessed=!0;const t=parseInt(localStorage.getItem("lastSplitUrlTestImpressionRequestTime"+this.test_id)||"0")||parseInt(c("lastSplitUrlTestImpressionRequestTime"+this.test_id)||"0")||0,i=Date.now();if(i-t>=f){localStorage.setItem("lastSplitUrlTestImpressionRequestTime"+this.test_id,i.toString()),r("lastSplitUrlTestImpressionRequestTime"+this.test_id,i.toString(),1);const t={id:this.test_id,type:"impression",variation_id:e.variations[0]?.id,time_to_conversion:(new Date).getTime()-this.start_time,variant:this.variant===e.variations[0]?.variant_a?"variant_a":"variant_b",event_id:e.events[0]?.event?.id,device_id:d(),session_id:u(),user_agent:window.navigator.userAgent,os:window.navigator?.platform,sh:window.screen.height,sw:window.screen.width,language:window.navigator?.userLanguage||window.navigator?.language,timezone:(new Date).getTimezoneOffset()/-60,viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,connection:window.navigator.connection?.effectiveType||"unknown",referrer:document.referrer||"direct",pageLoadTime:window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart,external_cookie_id:this.external_cookie_id};await this.recordAnalytics(t),await this.updateVariantVisitors(),this.impressionLogged=!0}}else if(p(window.location.origin+window.location.pathname?.replace("www.",""))===p(o?.replace("www.",""))){const t=new URL(window.location.href),i=new URLSearchParams(t.search),a=decodeURIComponent(i.get("referrer")||""),n=parseInt(localStorage.getItem("lastSplitUrlTestImpressionRequestTime"+this.test_id)||"0")||parseInt(c("lastSplitUrlTestImpressionRequestTime"+this.test_id)||"0")||0,o=Date.now();if(p(a?.replace("www.",""))===p(e.page_url?.replace("www.",""))&&(await this.updateVariantVisitors(),o-n>=f)){localStorage.setItem("lastSplitUrlTestImpressionRequestTime"+this.test_id,o.toString()),r("lastSplitUrlTestImpressionRequestTime"+this.test_id,o.toString(),1);const t={id:this.test_id,type:"impression",variation_id:e.variations[0]?.id,time_to_conversion:(new Date).getTime()-this.start_time,variant:this.variant===e.variations[0]?.variant_a?"variant_a":"variant_b",event_id:e.events[0]?.event?.id,device_id:d(),session_id:u(),user_agent:window.navigator.userAgent,os:window.navigator?.platform,sh:window.screen.height,sw:window.screen.width,language:window.navigator?.userLanguage||window.navigator?.language,timezone:(new Date).getTimezoneOffset()/-60,viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,connection:window.navigator.connection?.effectiveType||"unknown",referrer:document.referrer||"direct",pageLoadTime:window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart,external_cookie_id:this.external_cookie_id};await this.recordAnalytics(t),this.impressionLogged=!0}}S(this.flickerOverlayRemoved)}catch(e){console.error("Split URL test error:",e),S(this.flickerOverlayRemoved)}}}async updateVariantVisitors(){const e=a("lastUrlSplitTestVariantSeen")||c("lastUrlSplitTestVariantSeen");if(e){const t=I.splitUrlTests.getVisitors(this.test_id),i={method:"PATCH",body:JSON.stringify({variant:e}),headers:{"Content-Type":"application/json"}};try{const e=await fetch(t,i);if((await e.json()).data)return;throw new Error("Response data format is not as expected")}catch(e){throw e}}}async runConversionEvent(e,t){if(e&&this.criteria_match){p(window.location.origin+window.location.pathname)!==p(e.page_url)&&(i("lastUrlSplitTestVariantSeen",t,240),r("lastUrlSplitTestVariantSeen",t,1));const n=a("lastUrlSplitTestVariantSeen")||c("lastUrlSplitTestVariantSeen");if(n){const t=p(window.location.origin+window.location.pathname),i=p(e.page_url);t.includes(i)&&await this.recordConversion(e.type,e.id,this.test_id,n)}}}async recordConversion(e,t,i,a){if(!this.impressionLogged)try{const e={id:i,type:"impression",variation_id:this.test?.variations[0]?.id,time_to_conversion:(new Date).getTime()-this.start_time,variant:a===this.test?.variations[0]?.variant_a?"variant_a":"variant_b",event_id:this.test?.events[0]?.event?.id,device_id:d(),session_id:u(),user_agent:window.navigator.userAgent,os:window.navigator?.platform,sh:window.screen.height,sw:window.screen.width,language:window.navigator?.userLanguage||window.navigator?.language,timezone:(new Date).getTimezoneOffset()/-60,viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,connection:window.navigator.connection?.effectiveType||"unknown",referrer:document.referrer||"direct",pageLoadTime:window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart,external_cookie_id:this.external_cookie_id};await this.recordAnalytics(e),this.impressionLogged=!0}catch(e){console.error("Error logging impression before conversion:",e)}const n=parseInt(localStorage.getItem("lastSplitUrlTestConversionRequestTime"+t)||"0")||0,o=Date.now();if(o-n>=6e4){localStorage.setItem("lastSplitUrlTestConversionRequestTime"+t,o.toString()),r("lastSplitUrlTestConversionRequestTime"+t,o.toString());const e={id:i,type:"conversion",variation_id:this.test?.variations[0]?.id,time_to_conversion:(new Date).getTime()-this.start_time,variant:a===this.test?.variations[0]?.variant_a?"variant_a":"variant_b",event_id:t,device_id:d(),session_id:u(),user_agent:window.navigator.userAgent,os:window.navigator?.platform,sh:window.screen.height,sw:window.screen.width,language:window.navigator?.userLanguage||window.navigator?.language,timezone:(new Date).getTimezoneOffset()/-60,viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,connection:window.navigator.connection?.effectiveType||"unknown",referrer:document.referrer||"direct",external_cookie_id:this.external_cookie_id,pageLoadTime:window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart};return await this.recordAnalytics(e)}}async getTheSplitURLTest(e){try{let t=this.API_HOST+"/split-url-tests/"+e+"/with-variant?device_id="+d();const n=a("variant_token")||c("variant_token");n&&(t+="&variant_token="+n);const o={method:"GET",headers:{"Content-Type":"application/json"}},s=await fetch(t,o),l=await s.json();if(l.data)return this.test=l.data,this.variant=l.data.assigned_variant,l.data.variant_token&&(i("variant_token",l.data.variant_token,1440),r("variant_token",l.data.variant_token,1)),l.data;throw new Error("Response data format is not as expected")}catch(e){throw e}}async recordAnalytics(e){const t=this.API_HOST+"/split-url-tests/analytics",i={method:"POST",body:JSON.stringify({...e}),headers:{"Content-Type":"application/json"}};try{const e=await fetch(t,i),a=await e.json();if(a.data)return a.data;throw new Error("Response data format is not as expected")}catch(e){throw e}}checkTestCriteria(e){const t=new URLSearchParams(window.location.search),i=t.get("utm_source"),a=t.get("utm_medium"),n=t.get("utm_campaign"),r=t.get("utm_term"),o=t.get("utm_content");return!((e.devices.length||e.browsers.length||e.utm_source||e.utm_medium||e.utm_campaign||e.utm_term||e.utm_content||e.languages.length||e.regions.length)&&(e.devices.length&&!function(e){const t=navigator.userAgent;return e.some(e=>"mobile"===e.device?/Mobi|Android|iPhone|iPod|Windows Phone/i.test(t):"tablet"===e.device?/Tablet|iPad|Android(?!.*Mobile)/i.test(t):"desktop"===e.device&&!/Mobi|Android|Tablet|iPad|Windows Phone/i.test(t))}(e.devices)||e.browsers.length&&!e.browsers.map(e=>e.browser).includes(function(){const e=navigator.userAgent;return/chrome|crios|crmo/i.test(e)?"chrome":/firefox|fxios/i.test(e)?"firefox":/safari/i.test(e)?"safari":/opr|opera/i.test(e)?"opera":/edg/i.test(e)?"edge":"other"}())||i&&e.utm_source&&e.utm_source!==i||a&&e.utm_medium&&e.utm_medium!==a||n&&e.utm_campaign&&e.utm_campaign!==n||r&&e.utm_term&&e.utm_term!==r||o&&e.utm_content&&e.utm_content!==o||e.languages.length&&!e.languages.map(e=>e.language).includes(navigator.language)||e.regions.length&&!e.regions.map(e=>e.region).includes(navigator.language)))}}class U{constructor(){this.services=new Map,this.serviceFactories=new Map,this.config=null,this.registerService("testsContent",e=>new R(e?.domainId)),this.registerService("splitTests",e=>e?.testId&&""!==e.testId.trim()?new b(e.testId,e.host||""):null)}static getInstance(){return U.instance||(U.instance=new U),U.instance}registerService(e,t){this.serviceFactories.set(e,t)}initialize(e){this.config=e;for(const[t,i]of this.serviceFactories)try{const a=i(e);if(!a)continue;!1!==e.autoStart&&a.initialize(),this.services.set(t,a)}catch(e){"undefined"!=typeof console&&console.warn(`Failed to initialize service '${t}':`,e)}if("undefined"!=typeof window){const e={manager:this};for(const[t,i]of this.services)e[t]=i;window.KeakServices=e}}getService(e){return this.services.get(e)||null}getTestsContentService(){return this.getService("testsContent")}getSplitTestService(){return this.getService("splitTests")}getAllServices(){return new Map(this.services)}isInitialized(){return null!==this.config&&this.services.size>0}getConfig(){return this.config}reinitialize(e){this.services.clear(),this.initialize(e)}}function L(e){const t=U.getInstance();return t.initialize(e),t}function M(e,t){return L({host:e,domainId:t,autoStart:!0}).getTestsContentService()}function P(e,t,i){return L({host:t,domainId:i,testId:e,autoStart:!0}).getSplitTestService()}function x(){return U.getInstance()}function D(e,t){U.getInstance().registerService(e,t)}function N(e){const t=U.getInstance();for(const[i,a]of Object.entries(e))t.registerService(i,a)}if("undefined"!=typeof window){const e=window.KEAK_CONFIG;e?.host&&e?.domainId&&L({host:e.host,domainId:e.domainId,testId:e.testId,autoStart:!1!==e.autoStart,environment:e.environment||"production"}),window.KeakServicesBundle={TestsContentService:R,SplitTestService:b,ServicesManager:U,initializeServices:L,initializeTestsContentService:M,initializeSplitTestService:P,getServicesManager:x,registerService:D,registerServices:N,initializeGlobal:e=>{const t=L({host:e.host,domainId:e.domainId,testId:e.testId,autoStart:!0}),i=t.getTestsContentService(),a=t.getSplitTestService();return i&&(window.KeakTestsContentService=i),a&&(window.KeakSplitTestService=a),{testsContentService:i,splitTestService:a}}};const t=window;t.testsContentService=t.KeakServicesBundle}return t})());
//# sourceMappingURL=keak-script-service.js.map
}

// ===================================
// Auto-initialization
// ===================================
debugLog('🚀 Keak: Script loaded successfully');
debugLog('📊 Keak: Initial embedded data:', JSON.stringify(window.KEAK_EMBEDDED_DATA, null, 2));

// ===================================
// Desktop Project Sync (for keak-code projects)
// ===================================
