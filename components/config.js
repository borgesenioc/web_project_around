// Obtenha o token do localStorage (defina manualmente uma vez ou via um script de configuração)
export const API_TOKEN = localStorage.getItem('api_token') || ''
export const API_BASE_URL = 'https://around-api.pt-br.tripleten-services.com/v1'

// Não esqueça de definir o API_TOKEN no console do navegador antes de usar o app

// cole: localStorage.setItem('api_token', 'SEU_API_TOKEN')
// pressione ENTER
// Recarregue a página
