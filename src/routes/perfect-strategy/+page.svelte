<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { onMount, afterUpdate } from 'svelte';
	import axios from 'axios';

	let question: App.Question;

	let options = [
		{
			value: 'H',
			text: 'Hit',
			isCorrect: false
		},
		{
			value: 'S',
			text: 'Stand',
			isCorrect: false
		},
		{
			value: 'D',
			text: 'Double/Hit',
			isCorrect: false
		},
		{
			value: 'DS',
			text: 'Double/Stand',
			isCorrect: false
		}
	];

	const generateQuestion = async () => {
		const res = await axios.get('/api/generate-question');
		const data = await res.data;
		question = data;
	};

	const checkAnswer = (answer: string) => {
		options.forEach(option => {
			if (option.value === question.answer) {
				option.isCorrect = true;
			} else {
				option.isCorrect = false;
			}
		});

		console.log(options)
		// if (answer === question.answer) {
		// 	alert('Correct!');
		// } else {
		// 	alert('Incorrect!');
		// }
		// generateQuestion();
	};

	onMount(generateQuestion);

$: {options = [...options]; }
		

</script>

<div class="text-center">
	<h1 class="h1">Perfect Strategy</h1>
	<div class="flex justify-center flex-col mt-[4rem]">
		<div class="flex-col flex mx-auto">
			{#if question}
				<div class="flex space-x-2 mx-auto">
					<p>Dealer Upcard:</p>
					<p>{question.dealerUpcard}</p>
				</div>
				<div class="flex space-x-2 mx-auto">
					<p>Player Total:</p>
					<p>{question.playerTotal}</p>
				</div>
				<div class="flex justify-center">
					<div class="grid grid-cols-2">
						{#each options as option}
							<button
								on:click={() => checkAnswer(option.value)}
								class="btn {option.isCorrect ? 'variant-filled-success' : 'variant-filled-primary'} m-2">{option.text}</button
							>
						{/each}
					</div>
				</div>
			{:else}
				<ProgressRadial />
			{/if}
		</div>
	</div>
</div>
