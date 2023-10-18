# URL Parameter Freezer 
This Chrome plugin allow you to freeze parameters in URL, so they stay the same when navigating betweek different pages.

This was initially developed to use with Grafana so that you can freeze a selected time range and have it stay the same when navigating to a different dashboard.

## Installation

1. Clone this repo
```
  git clone https://github.com/JGShaw/parameter-freezer/
```
2. In Chrome, go to: `chrome://extensions/`
3. Enable `Developer mode`
4. Click `Load unpacked` and select inside the cloned repo
   
## Usage

Use the extension pop up to manage the parameters you want to freeze. When a parameter is frozen it will be persisted across all pages you navigate to.

## Known issues
- Does not work properly when a parameter appears multiple times

## TODO
- Add toggle to switch off the redirection that watches the URL in the service worker, so it just uses chrome.declarativeNetRequest. This was added to work with single page apps (e.g. Grafana) but can make it much slower if it does through multiple redirects.
- Add option to limit freezes to just within one domain
- Publish
