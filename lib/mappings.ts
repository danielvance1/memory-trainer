import { supabase } from '@/lib/supabase'

export async function deleteMapping(digits: string) : Promise<boolean> {
    const { error } = await supabase
        .from('mappings')
        .delete()
        .eq('digits', digits)

    if (error) {
        console.error('Error deleting:', error)
        return false;
    } else return true
}

export async function setMappingDescription(digits: string, description: string) : Promise<boolean> {
    const { error } = await supabase
        .from('mappings')
        .upsert({ digits: digits, description: description }, { onConflict: 'user_id,digits'})

    if (error) {
        console.error('Error inserting:', error)
        return false;
    } else return true
}