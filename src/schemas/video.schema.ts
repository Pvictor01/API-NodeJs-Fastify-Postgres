import { z } from 'zod';

export const videoSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  duration: z.number().int().positive("A duração deve ser um número positivo")
});

// Extraindo o tipo para usar no banco de dados
export type Video = z.infer<typeof videoSchema>;