import express from 'express';
import { Schema } from './data/schema';
import graphQLHTTP from 'express-graphql';
import { printSchema } from 'graphql/utilities/schemaPrinter';
import path from 'path';

const app = express();
app.use(express.static(path.resolve(__dirname, 'public')));
app.use('/schema',function(req,res,next) {
    res.set('Content-Type', 'text/plain');
    res.send(printSchema(Schema));
  });
app.use('/', graphQLHTTP({ schema: Schema, pretty: true }));
app.listen(8080, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('GraphQL Server is now running on localhost:8080');
});