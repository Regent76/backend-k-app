import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';

chai.use(chaiHttp);

dotenv.config({
    path: './.env'
});

const serverUrl = process.env.TEST_SERVER_ADDRESS;
let should = chai.should();

describe('GET /info', () => {
    it('it should GET company info', (done) => {
        chai.request(serverUrl)
            .get('/api/v1/info')
            .end((err, res) => {
                console.log(res);
                res.should.have.status(200);
                res.body.data.info.should.be.eql('Some information about the <b>company</b>.');
                done();
            });
    });
});

describe('POST /register', () => {
    const testUser = {
        email: 'test@email.com',
        password: 'testPassword',
        fullname: 'testFullname',
    };
    it('it should POST user', (done) => {
        chai.request(serverUrl)
            .post('/api/v1/register')
            .send(testUser)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.data.should.be.eql({});
                done();
            });
    });
});

describe('POST /login', () => {
    const testUser = {
        email: 'test@email.com',
        password: 'testPassword',
    };
    it('it should POST login', (done) => {
        chai.request(serverUrl)
            .post('/api/v1/login')
            .send(testUser)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.token.should.be.not.eql('');
                res.body.data.token.should.be.not.eql(null);
                done();
            });
    });
});

describe('GET /profile', () => {
    const testUser = {
        email: 'test@email.com',
        password: 'testPassword',
    };
    const testUserResult = {
        email: 'test@email.com',
        fullname: 'testFullname',
    };

    it('it should GET profile', (done) => {
        let userToken = '';
        chai.request(serverUrl)
            .post('/api/v1/login')
            .send(testUser)
            .end((err, res) => {
                userToken = res.body.data.token;

                chai.request(serverUrl)
                    .get('/api/v1/profile?token=' + userToken)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.should.be.eql(testUserResult);
                        done();
                    });
            });
    });
});

describe('GET /author', () => {
    const testUser = {
        email: 'test@email.com',
        password: 'testPassword',
    };
    it('it should GET random author', (done) => {
        let userToken = '';
        chai.request(serverUrl)
            .post('/api/v1/login')
            .send(testUser)
            .end((err, res) => {
                userToken = res.body.data.token;
                chai.request(serverUrl)
                    .get('/api/v1/author?token=' + userToken)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.should.include.keys(['authorId', 'name']);
                        done();
                    });
            });
    });
});

describe('GET /quote', () => {
    const testUser = {
        email: 'test@email.com',
        password: 'testPassword',
    };
    const authorId = 1;
    it('it should GET random quote by author', (done) => {
        let userToken = '';
        chai.request(serverUrl)
            .post('/api/v1/login')
            .send(testUser)
            .end((err, res) => {
                userToken = res.body.data.token;
                chai.request(serverUrl)
                    .get('/api/v1/quote?token=' + userToken + '&authorId=' + authorId)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.should.include.keys(['authorId', 'quoteId', 'quote']);
                        res.body.data.authorId.should.be.eql(authorId);
                        done();
                    });
            });
    });
});

describe('DELETE /logout', () => {
    const testUser = {
        email: 'test@email.com',
        password: 'testPassword',
    };

    it('it should DELETE user token', (done) => {
        let userToken = '';
        chai.request(serverUrl)
            .post('/api/v1/login')
            .send(testUser)
            .end((err, res) => {
                userToken = res.body.data.token;
                chai.request(serverUrl)
                    .delete('/api/v1/logout?token=' + userToken)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.should.be.eql({});
                        done();
                    });
            });
    });
});
