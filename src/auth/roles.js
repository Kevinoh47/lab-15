'use strict';

import mongoose from 'mongoose';

const rolesSchema = new mongoose.Schema (
  {
  role: {type: String, required: true},
  capabilities: {type: Array, required:true},
  }, 
);

export default mongoose.model('roles', rolesSchema);
