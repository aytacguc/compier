# Vue Component Creation Tool

This command line tool allows you to easily create Vue.js components with a specified name and directory path.

## Installation

You can install the component creation tool globally via npm:

```bash
npm install -g compier

```

add compier to package.json

```js
"scripts":{
  "compier": "node compier.js",
}
```

## Usage

```bash
compier <componentName> [componentPath]
```

<componentName>: The name of the Vue component to create.
[componentPath] (optional): The directory path where the component will be created. If not provided, the component will be created in the "src/components/" directory by default.

## Vue Component Template

You can use the following Vue component template as a starting point for your components:

```vue
<template>
   <div class="dynamicClassName-c">
      <!-- Header -->
      <div class="dynamicClassName-header-wrapper"></div>

      <!-- Body -->
      <div class="dynamicClassName-body-wrapper"></div>

      <!-- Footer -->
      <div class="dynamicClassName-footer-wrapper"></div>
   </div>
</template>

<script>
export default {
   name: "ComponentName",
};
</script>

<style lang="scss" scoped>
.dynamicClassName-c {
   .dynamicClassName-header-wrapper {
   }
   .dynamicClassName-body-wrapper {
   }
   .dynamicClassName-footer-wrapper {
   }
}
</style>
```

## License

Feel free to copy this README.md content into your project! If you have any further questions or need assistance, feel free to ask.

## Authors

-  [@aytacguc](https://www.github.com/aytacguc)
