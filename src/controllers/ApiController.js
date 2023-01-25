import * as yup from 'yup';
import express from 'express';
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';

class ApiController {
  constructor({ logger, routerV1, authorRepository, quoteRepository, tokenRepository, userRepository }) {
    this.logger = logger;
    this.routerV1 = routerV1;
    this.authorRepository = authorRepository;
    this.quoteRepository = quoteRepository;
    this.tokenRepository = tokenRepository;
    this.userRepository = userRepository;
  }

  attach() {
    this.logger.log('Attaching ApiController.');

    // APIs
    this.routerV1.get('/info', this.companyInfo.bind(this));
    this.routerV1.post('/register', this.IsNotAuthenticated.bind(this), express.json(), this.registerUser.bind(this));
    this.routerV1.post('/login', this.IsNotAuthenticated.bind(this), express.json(), this.loginUser.bind(this));
    this.routerV1.get('/profile', this.IsAuthenticated.bind(this), this.currentUser.bind(this));
    this.routerV1.get('/author', this.IsAuthenticated.bind(this), this.randomAuthor.bind(this));
    this.routerV1.get('/quote', this.IsAuthenticated.bind(this), this.randomQuoteByAuthor.bind(this));
    this.routerV1.delete('/logout', this.IsAuthenticated.bind(this), this.logoutUser.bind(this));
  }

  async IsNotAuthenticated(request, response, next){
    if (!request?.query?.token) {
      next();
    } else {
      const token = { token: request.query.token };
      const tokenRecord = await this.tokenRepository.findRelatedUserByToken(token);
      if (!tokenRecord) {
        next();
      } else {
        response.status(403).json({
          status: 'ERROR',
          error: 'Please, logout from the application.',
        });
      }
    }
  }

  async IsAuthenticated(request, response, next){
    const token = { token: request.query.token };
    const tokenRecord = await this.tokenRepository.findRelatedUserByToken(token);
    if (tokenRecord) {
      request.tokenRecord = tokenRecord;
      request.token = token;
      next();
    } else {
      response.status(401).json({
        status: 'ERROR',
        error: 'Please, login into the application.',
      });
    }
  }

  async companyInfo(request, response) {
    response.status(200).json({
      "success": true,
      "data": {
        "info": "Some information about the <b>company</b>."
      }
    });
  }

  async registerUser(request, response) {
    const postSchema = yup.object().shape({
      email: yup.string().required(),
      password: yup.string().required(),
      fullname: yup.string().required(),
    });

    try {
      let postData = await postSchema.validate(request.body, { stripUnknown: true });
      const saltRounds = 10;
      const User = {
        email: postData.email,
        password: bcrypt.hashSync(postData.password, saltRounds),
        fullname: postData.fullname,
      };

      await this.userRepository.createUser(User);

      response.status(201).json({
        "success": true,
        "data": {}
      });
    } catch (error) {
      this.logger.error(error.message);
      response.status(422).json({
        status: 'ERROR',
        error: error.message,
      });
    }
  }

  async loginUser(request, response) {
    const postSchema = yup.object().shape({
      email: yup.string().required(),
      password: yup.string().required(),
    });

    try {
      let postData = await postSchema.validate(request.body, { stripUnknown: true });
      const email = { email: postData.email };
      const userRecord = await this.userRepository.findUserByEmail(email);

      if (!userRecord || !bcrypt.compareSync(postData.password, userRecord.password)) {
        response.status(403).json({
          status: 'ERROR',
          error: 'Please, check typed email and password.',
        });
      }

      const tokenValue = (uuidv4()).replace(/^(.{8})-(.{4})-(.{4})-(.{4})-(.{12})$/, '$1$2$3$4$5');
      const token = {
        userId: userRecord.userId,
        token: tokenValue,
      };
      const userId = { userId: userRecord.userId};
      await this.tokenRepository.clearTokenByFilter(userId);
      await this.tokenRepository.createToken(token);

      response.status(200).json({
        "success": true,
        "data": {
          "token": tokenValue
        }
      });
    } catch (error) {
      this.logger.error(error.message);
      response.status(422).json({
        status: 'ERROR',
        error: error.message,
      });
    }
  }

  async logoutUser(request, response) {
    await this.tokenRepository.clearTokenByFilter(request.token);
    response.status(200).json({
      "success": true,
      "data": {}
    });
  }

  async currentUser(request, response) {
    try {
      response.status(200).json({
        "success": true,
        "data": {
          "fullname": request.tokenRecord.fullname,
          "email": request.tokenRecord.email
        }
      });
    } catch (error) {
      this.logger.error(error.message);
      response.status(422).json({
        status: 'ERROR',
        error: error.message,
      });
    }
  }

  async randomAuthor(request, response) {
    try {
      const randomAuthor = await this.authorRepository.findRandomAuthor();
      setTimeout(() => {
        response.status(200).json({
          "success": true,
          "data": randomAuthor ?? {}
        });
      }, 5000);
    } catch (error) {
      this.logger.error(error.message);
      response.status(422).json({
        status: 'ERROR',
        error: error.message,
      });
    }
  }

  async randomQuoteByAuthor(request, response) {
    const author = { authorId: request.query.authorId };
    try {
      const randomQuoteByAuthor = await this.quoteRepository.findRandomQuoteByAuthor(author);
      setTimeout(() => {
        response.status(200).json({
          "success": true,
          "data": randomQuoteByAuthor ?? {}
        });
      }, 5000);
    } catch (error) {
      this.logger.error(error.message);
      response.status(422).json({
        status: 'ERROR',
        error: error.message,
      });
    }
  }
}

export default ApiController;
