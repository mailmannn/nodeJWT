let chai = require('chai');
let chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);

var request = require('supertest')('http://localhost:4000');

describe('/POST user authenticate', () => {
    it('should create User TestAuth', (done) => {
        chai.request('http://localhost:4000')
            .post('/users/register')
            .type('form')
            .send({ 'username': 'TestAuth', 'password': 'TestAuth', 'firstName': 'TestAuth', 'lastName':'TestAuthlastname', 'email':'testauth@gmail.com' })
            .end((err, res) => {
                  expect(err).to.be.null;
                  expect(res).to.have.status(200);
              done();
            });
      });
    
    it('should auth with success', (done) => {
      chai.request('http://localhost:4000')
          .post('/users/authenticate')
          .type('form')
          .send({ 'username': 'TestAuth', 'password': 'TestAuth' })
          .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
            done();
          });
    });
    it('should return username', (done) => {
        chai.request('http://localhost:4000')
            .post('/users/authenticate')
            .type('form')
            .send({ 'username': 'TestAuth', 'password': 'TestAuth' })
            .end((err, res) => {
                  expect(err).to.be.null;
                  expect(res).to.have.status(200);
                  expect(res.body.username).to.be.equal("TestAuth");
              done();
            });
        });
    it('should return token', (done) => {
            chai.request('http://localhost:4000')
                .post('/users/authenticate')
                .type('form')
                .send({ 'username': 'TestAuth', 'password': 'TestAuth' })
                .end((err, res) => {
                      expect(err).to.be.null;
                      expect(res).to.have.status(200);
                      expect(res.body).to.have.property('token')
                  done();
                });
            });
    it('should return wrong password INCORRECT_USERNAME_OR_PASSWORD for incorrect password', (done) => {
                chai.request('http://localhost:4000')
                    .post('/users/authenticate')
                    .type('form')
                    .send({ 'username': 'TestAuth', 'password': 'TestAuth1' })
                    .end((err, res) => {
                          expect(err).to.be.null;
                          expect(res).to.have.status(401);
                          expect(res.body).to.have.property('status');
                          expect(res.body.status).to.be.equal("Error");
                          expect(res.body).to.have.property('message');
                          expect(res.body.message).to.be.equal("INCORRECT_USERNAME_OR_PASSWORD");
                      done();
                    });
                });
    it('should return wrong password INCORRECT_USERNAME_OR_PASSWORD for incorrect username', (done) => {
                    chai.request('http://localhost:4000')
                        .post('/users/authenticate')
                        .type('form')
                        .send({ 'username': 'TestAuth1', 'password': 'TestAuth' })
                        .end((err, res) => {
                              expect(err).to.be.null;
                              expect(res).to.have.status(401);
                              expect(res.body).to.have.property('status');
                              expect(res.body.status).to.be.equal("Error");
                              expect(res.body).to.have.property('message');
                              expect(res.body.message).to.be.equal("INCORRECT_USERNAME_OR_PASSWORD");
                          done();
                        });
                    });

    var auth = {};
    before(loginUser(auth));
    it('should delete user TestAuth', (done) => {
        request
            .delete('/users/TestAuth')
            .type('form')
            .set('Authorization', 'bearer ' + auth.token)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    function loginUser(auth) {
        return (done) => {
            request
                .post('/users/authenticate')
                .send({
                    username: 'manager',
                    password: 'manager'
                })
                .type('form')
                .expect(200)
                .end(onResponse);
    
            function onResponse(err, res) {
                auth.token = res.body.token;
                return done();
            }
        };
    }
});