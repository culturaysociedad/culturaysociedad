import { supabase } from './supabase';

export async function reportContent({
  type,
  contentId,
  reason,
  userId
}: {
  type: 'comment' | 'reaction';
  contentId: string;
  reason: string;
  userId: string;
}) {
  return supabase.from('reportes').insert({
    tipo: type,
    contenido_id: contentId,
    motivo: reason,
    usuario_id: userId,
    creado_en: new Date().toISOString()
  });
}
