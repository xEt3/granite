James - 8/11/16
- Add "bubble-action" util
- Add `ember-inflector`, `ember-cli-nprogress` dependencies
- Swap onboarding divider headers for `dividing` headers
- Add `input/equipment-picker` component
- Add modal, interactions, and actions for creating, assigning and unassigning assets in the `employee/onboarding/equipment`
- Add loading transition to application
- Add `silent` option to `ajax-status#ajaxSuccess`

James - 8/10/16
- Auth's `isExpiring` now is true only if authenticated
- Add dropdown for equipment assign page
- Only show attributes in asset-stock-item if there are actually attrs

Scott - 8/10/16
- Modified asset-stock-item

James - 8/9/16
- Hooked up a "show attrs for all" button in `asset.index`
- Added styles for .line-item-value
- Duplicated refreshable mixin from slate repo
- Added template/code for list-item/asset-stock-item
- Add custom field component for custom attribute editing
- Fix initial page var bug in x-pagination
- Fix some design files
- Add `transitions.js` file for liquid fire use
- Add `isExpiring` cp to `auth` service and stub `refreshSession` for future use
- You can now add attributes to asset categories
- Add session expiration notice to application template. Does nothing but display for now.
- Add `onResponse` action attr handler to `confirm-modal` component for alternate usage
- Added `account/asset/index/new`
- Added Array Transform
- Added `attributes` key to `asset` model

Scott - 8/9/16
- Added Route/Controller/Template for New Asset Item
