// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import { config } from '@keystone-6/core'

// to keep this file tidy, we define our schema in a different file
import { lists } from './schema'

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from './auth'
import { cloudinaryImage } from '@keystone-6/cloudinary'

const baseUrl = 'http://localhost:3000';

export default withAuth(
  config({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      // provider: 'sqlite',
      // url: 'file:./keystone.db',

      provider: 'postgresql',
      url: 'postgres://postgres:pgpwd4test@localhost:5432/keystone',
      // Optional advanced configuration
      enableLogging: true,
      idField: { kind: 'uuid' },
      shadowDatabaseUrl: 'postgres://postgres:pgpwd4test@localhost:5432/shadowdb'
    },
    storage: {
      my_local_images: {
          // Images that use this store will be stored on the local machine
          kind: 'local',
          // This store is used for the image field type
          type: 'image',
          // The URL that is returned in the Keystone GraphQL API
          generateUrl: path => `${baseUrl}/uploads${path}`,
          // The route that will be created in Keystone's backend to serve the images
          serverRoute: {
              path: '/uploads',
          },
          // Set serverRoute to null if you don't want a route to be created in Keystone
          // serverRoute: null
          storagePath: 'public/uploads',
      },
      /** more storage */
    },
    lists,
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    session,
  })
)
