<script lang="ts">
	import { ProgressRadial, type ModalSettings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import axios from 'axios';

	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	const triggerModal = (question: App.Question) => {
		const correctAnswer = options.find((option) => option.value === question.answer);
		const modal: ModalSettings = {
			type: 'alert',
			title: 'Incorrect Answer',
			body: `The dealer's upcard was ${question.dealerUpcard} and the player's total was ${question.playerTotal}. The correct answer was ${correctAnswer?.text}.`,
			buttonTextCancel: 'Okay'
		};
		modalStore.trigger(modal);
	};

	let question: App.Question;

	let showBackground: boolean = false;

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
		const res = await axios.get('/api/generate-question');
		const data = await res.data;
		question = data;
	};

	const checkAnswer = (answer: string) => {
		console.log(options);
		if (answer === question.answer) {
			showBackground = true;
			setTimeout(() => {
				showBackground = false;
			}, 300);
		} else {
			triggerModal(question);
		}
		generateQuestion();
	};

	onMount(generateQuestion);
</script>

<div class="text-center">
	{#if showBackground}
		<div class="background"></div>
	{/if}
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
								class="btn variant-filled-primary m-2">{option.text}</button
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

<style>
	.background {
		background-color: rgb(0, 161, 0);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
</style>
