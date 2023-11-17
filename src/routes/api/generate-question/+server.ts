import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL } from '$env/static/private';
import { SUPABASE_KEY } from '$env/static/private';

const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getRandomQuestion() {
	try {
		// Fetch a random question from the 'questions' table
		const { data: question, error } = await supabase
			.from('random_questions')
			.select('dealer_upcard, player_total, answer')
			.limit(1);

		if (error) {
			throw error;
		}

		if (question && question.length > 0) {
			const randomQuestion = question[0];
			return randomQuestion;
		} else {
			return 'No questions found.';
		}
	} catch (error) {
		console.error('Error fetching random question:', error);
	}
}

export const GET: RequestHandler = async () => {
	const isAuth = true;

	if (!isAuth) {
		throw error(401, 'Unauthorized');
	}

	const question = await getRandomQuestion();

	return new Response(JSON.stringify(question), { status: 200 });
};

//http://[::1]:5173/api/generate-question
