module.exports = {
    mail_jira: 'marcoantoniomamanichura2020@gmail.com',
    toke_jira:'ATATT3xFfGF0FN-tFW2Gj3feCemdGlEmW91P2_J7IupdKPDktXSiHqpeL7LmQ1RdEtmZcS5syp68U5IGv11-kr9i3U9bSFpMz7_6cL6zfYN8isPth6jtTcT0N_bQwKxi9CMmAliuK9BbJfVbp_yTqshYs23H4Whw-wjZFKxuML3bgSF4wVJ3_SM=2C3C9D9B',
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
