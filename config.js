module.exports = {
    mail_jira: 'marcoantoniomamanichura2020@gmail.com',
    toke_jira:'ATATT3xFfGF0fp16f1ogeR_Knlr5v4RtWCDpDiTLtenvN4_FT5HZu1Tlq_vlT3nJ6ALqgFzbdjXtviJL2nzrs8hz3cNtBAFr91oMX2S8mJ8JAL4OPpWhvaMRok4IDVtW_1Zppthkt8fSQobPRPIQDpFigzNeP-OGMLxQgBcW0c0eISSL2o6WrP4=B5B79F3C',
    key_chatgpt: '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',
    model_chatgpt:'gpt-4',
    temperature: 0,
    max_tokens: 1024,
    url_chatgpt:'https://api.openai.com/v1/chat/completions',
    port: process.env.PORT || 3040,
    db: process.env.MSSQL || {server: '192.168.0.1',
                              database: 'test',
                              user: 'test',
                              password: '123',
                              port: 1433},
    SECRET_TOKEN:'8caeM5V+HGJgzIHdPy68eBdMLZ6H1TNYqAX0rgRLauvYO0Z9KG/fuNQVumsEbYrNi5wkKKKZArUpTks5s3SiUg'
}
