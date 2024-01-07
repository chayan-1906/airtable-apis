export const base_url = 'https://api.airtable.com/v0/meta'
export const get_all_bases_url = `${base_url}/bases`
export const get_all_tables_url = (baseId) => `${get_all_bases_url}/${baseId}/tables`
// export const get_table_details_url = (baseId) => `${get_all_bases_url}/${baseId}/tables` ???