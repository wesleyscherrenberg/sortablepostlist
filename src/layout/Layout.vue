<template>
  <main class="container">
    <div class="grid lg:grid-cols-2 gap-12 lg:gap-24 my-10">
      <slot />
    </div>
  </main>

  <img class="absolute w-full top-0 left-0 h-[15rem] -z-10" :src="'/background.svg'" alt="background.svg" />
</template>
