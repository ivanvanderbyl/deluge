# Deluge UI

Deluge UI is an implementation of core UI components which conform to the Google
Material guidelines.

[![Build Status](https://travis-ci.org/ivanvanderbyl/deluge.svg)](https://travis-ci.org/ivanvanderbyl/deluge)

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

# Components

## `deluge-menu-button`

A generic button which opens and closes a disclosed content box. This is used to
implement a dropdown menu and dropdown panel.

```hbs
{{#deluge-menu-button as |button|}}
  Dropdown Content
{{else}}
  Button Label
{{/deluge-menu-button}}
```

If you use it with the `deluge-dropdown` it will gain some useful behaviours, including
the ability to close when losing focus, and respond to keyboard shortcuts like `esc`.

```hbs
{{#deluge-menu-button as |button|}}
  {{#deluge-dropdown close=button.close}}
    Dropdown Content
  {{/deluge-dropdown}}
{{else}}
  Button Label
{{/deluge-menu-button}}
```

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
