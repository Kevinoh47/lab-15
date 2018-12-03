'use strict';

import Model from '../model.js';
import schema from './articles-schema.js';


class Articles extends Model {
  // Article-specific override for patch method
  patch(id, data) {
    return this.storage.find({_id:id})
      .then(results => {
        let instance = results[0];
        if ( data.comment ) {
          console.log(instance, data.comment);
          instance.comments.push(data.comment);
        }
        delete data.comment;
        delete instance.comments;
        instance = Object.assign(instance,data);
        return this.storage.save(instance);
      });
  }

}

const article = new Articles(schema);

export default article;
