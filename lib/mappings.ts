import { supabase } from '@/lib/supabase'

async function deleteMapping(digits: string) : Promise<boolean> {
    const { error } = await supabase
        .from('mappings')
        .delete()
        .eq('digits', digits)

    if (error) {
        console.error('Error deleting:', error)
        return false;
    } else return true
}

async function setMappingDescription(digits: string, description: string) : Promise<boolean> {
    const { error } = await supabase
        .from('mappings')
        .insert({ digits: digits, description: description })

    if (error) {
        console.error('Error inserting:', error)
        return false;
    } else return true
}