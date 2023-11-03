module.exports = {
    mail_jira: 'marcoantoniomamanichura2020@gmail.com',
    toke_jira:'ATATT3xFfGF0UejoyBt5jhkcsII5PDlyu_Afevq9uwULwAz7a9tZEksfZ8WnYXpR4F2AJIZT7N4ftri_5XQXzFZVPXuEc9nNEDLTF87Bp6KSubDrsYVmQDxOhWNlEGWhJ9ndqVZoPHS2bZ1p8Lwmi0N9LUo-c48ReGXjnWULh1kHsXZZnLkeStM=A67E0E1F',
    key_chatgpt: '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',
    model_chatgpt:'gpt-4',
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
