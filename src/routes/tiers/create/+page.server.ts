import { createTierListSchema } from '$lib/schemas/tier-list';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
  const form = await superValidate(zod(createTierListSchema));

  return { form };
};

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(createTierListSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { data, valid } = form;

    return message(form, 'Form posted successfully!');
  }
};
