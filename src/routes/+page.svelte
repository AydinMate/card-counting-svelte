<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	let question: App.Question;

	let options = [
		{
			value: 'H',
			text: 'Hit'
		},
		{
			value: 'S',
			text: 'Stand'
		},
		{
			value: 'D',
			text: 'Double/Hit'
		},
		{
			value: 'DS',
			text: 'Double/Stand'
		}
	];

	const generateQuestion = async () => {
		const res = await fetch('/api/generate-question');
		const data = await res.json();
		console.log(data);
		question = data;
	};

	const checkAnswer = (answer: string) => {
		if (answer === question.answer) {
			alert('Correct!');
		} else {
			alert('Incorrect!');
		}
		generateQuestion();
	};

	onMount(generateQuestion);
</script>

<div class="text-center">
	<h1 class="h1">Card Counting</h1>
	<div class="flex justify-center flex-col space-y-[4rem] mt-[4rem]">
		{#if question}
		<div class="flex-col flex mx-auto">
			<div class="flex space-x-2">
				<p>Dealer Upcard:</p>
				<p>{question.dealerUpcard}</p>
			</div>
			<div class="flex space-x-2">
				<p>Player Total:</p>
				<p>{question.playerTotal}</p>
			</div>
		</div>
		<div class="flex justify-center">
			<div class="grid grid-cols-2 w-[30%]">
				{#each options as option}
					<button on:click={() => checkAnswer(option.value)} class="btn variant-filled-primary m-2"
						>{option.text}</button
					>
				{/each}
			</div></div>
		{:else}
			<ProgressRadial />
		{/if}
	</div>
</div>
