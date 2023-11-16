module.exports = {
    mail_jira: 'marcoantoniomamanichura2020@gmail.com',
    toke_jira:'A1',
    key_chatgpt: '',
    model_chatgpt:'gpt-4-1106-preview',
    temperature: 0,
    max_tokens: 4096,
    url_chatgpt:'https://api.openai.com/v1/chat/completions',
    port: process.env.PORT || 3040,
    db: process.env.MSSQL || {server: '192.168.0.1',
                              database: 'test',
                              user: 'test',
                              password: '123',
                              port: 1433},
    SECRET_TOKEN:'8caeM5V+HGJgzIHdPy68eBdMLZ6H1TNYqAX0rgRLauvYO0Z9KG/fuNQVumsEbYrNi5wkKKKZArUpTks5s3SiUg'
}
