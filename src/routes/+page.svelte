<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	let question: App.Question;

	const generateQuestion = async () => {
		const res = await fetch('/api/generate-question');
		const data = await res.json();
		console.log(data);
		question = data;
	};

	onMount(generateQuestion);
</script>

<div>
	<h1 class="h1">Card counting</h1>
	<button on:click={generateQuestion} class="btn variant-filled-primary">Generate Question</button>

	{#if question}
		<div class="flex space-x-2">
			<p>Dealer Upcard:</p>
			<p>{question.dealerUpcard}</p>
		</div>
		<div class="flex space-x-2">
			<p>Player Total:</p>
			<p>{question.playerTotal}</p>
		</div>
		<div class="flex space-x-2">
			<p>Answer:</p>
			<p>{question.answer}</p>
		</div>
	{:else}
		<ProgressRadial />
	{/if}
</div>
