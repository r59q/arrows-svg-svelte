<script lang="ts">
  import { arrowSrc, arrowDest } from "../lib";
  import { onMount } from "svelte";

  onMount(() => {
    setTimeout(() => {
      // drawArrows();
    }, 200);
  });

  const iterated = (arr: number[]) => {
    return arr.map((val) => val + 1).map((val) => val % ids.length);
  };

  let ids = [0, 1, 2, 3, 4, 5];
  let targetIds = iterated(ids);

  const iterate = () => {
    targetIds = iterated([...targetIds]);
  };

  // Remove an element from destinations
  const reduce = () => {
    const [some, ...rest] = [...targetIds].reverse();
    targetIds = rest;
  };

  const srcReduce = () => {
    const [some, ...rest] = [...ids].reverse();
    ids = rest;
  };
</script>

<main class="w-screen h-screen">
  <div class="flex flex-col justify-center h-full">
    <div class="flex flex-row justify-evenly">
      <div class="flex flex-col">
        <button on:click={srcReduce}>reduce</button>
        {#each ids as id}
          <p use:arrowSrc={id}>{id}</p>
        {/each}
      </div>
      <div class="flex flex-col">
        <div class="relative flex flex-row">
          <button on:click={iterate} class="left-[-80px] bottom-4 absolute">
            Iterate
          </button>
          <button class="left-10 bottom-4 absolute" on:click={reduce}>
            reduce
          </button>
        </div>
        {#each targetIds as id}
          <p use:arrowDest={id}>{id}</p>
        {/each}
      </div>
    </div>
  </div>
</main>
