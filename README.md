# James Marriott Portfolio

A portfolio & personal website for Full-Stack Developer James Marriott - Built with NextJS, TypeScript, Tailwind CSS, ShadCN and Three.js. CMS powered by Payload CMS.

## Content

This project is a template for building a website with Payload CMS. You can clone this repo and use it as a starting point for your own website. It includes a pre-configured Payload CMS setup, as well as a Next.js frontend. You will need to set up your own sqlite database and environment variables to get started.

## Quick Start - local setup

To spin up this template locally, follow these steps:

### Clone

After you click the `Deploy` button above, you'll want to have standalone copy of this repo on your machine. If you've already cloned this repo, skip to [Development](#development).

### Development

1. First [clone the repo](#clone) if you have not done so already
2. `cd my-project && cp .env.example .env` to copy the example environment variables. I am using SQLite for with[turso](https://payloadcms.com/posts/guides/how-to-set-up-payload-with-sqlite-and-turso-for-deployment-on-vercel)
3. `bun install && bun dev` to install dependencies and start the dev server
4. open `http://localhost:3000` to open the app in your browser

That's it! Changes made in `./src` will be reflected in your app. Follow the on-screen instructions to login and create your first admin user. Then check out [Production](#production) once you're ready to build and serve your app, and [Deployment](#deployment) when you're ready to go live.

## How it works

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/main/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Media

  This is the uploads enabled collection. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.
