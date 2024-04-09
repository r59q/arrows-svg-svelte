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
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
      </div>
      <div class="flex flex-col">
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
      </div>
    </div>
  </div>
</main>
