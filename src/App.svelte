<script lang="ts">
  import { arrowSrc, arrowDest, drawArrows } from "../lib";
  import { onMount } from "svelte";

  onMount(() => {
    setTimeout(() => {
      drawArrows();
    }, 200);
  });
</script>

<main class="w-screen h-screen">
  <div class="flex flex-col justify-center h-full">
    <div class="flex flex-row justify-evenly">
      <div class="flex flex-col">
        <p use:arrowSrc={1}>1</p>
        <p use:arrowSrc={2}>2</p>
        <p use:arrowSrc={3}>3</p>
        <p use:arrowSrc={4}>4</p>
        <p use:arrowSrc={5}>5</p>
        <p use:arrowSrc={6}>6</p>
      </div>
      <div class="flex flex-col">
        <p use:arrowDest={4}>1</p>
        <p use:arrowDest={5}>2</p>
        <p use:arrowDest={6}>3</p>
        <p use:arrowDest={1}>4</p>
        <p use:arrowDest={2}>5</p>
        <p use:arrowDest={3}>6</p>
      </div>
    </div>
  </div>
</main>
