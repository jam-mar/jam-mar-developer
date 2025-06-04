# James Marriott Portfolio

A portfolio & personal website for Full-Stack Developer James Marriott - Built with NextJS, TypeScript, Tailwind CSS, ShadCN and Three.js. CMS powered by Payload CMS.

## Development

To spin up this template locally, follow these steps:

1. Clone the repo
2. `cd my-project && cp .env.example .env` to copy the example environment variables. I am using SQLite for with[turso](https://payloadcms.com/posts/guides/how-to-set-up-payload-with-sqlite-and-turso-for-deployment-on-vercel)
3. `bun install && bun dev` to install dependencies and start the dev server
4. open `http://localhost:3000` to open the app in your browser
5. copy the `.env` variables from the `.env.example` as set your environment variables in your local `.env` file.
6. create a sql lite database in the data folder called 'dev-database.db'

## Deployment

To deploy this project, you can use Vercel or any other hosting provider that supports Next.js applications. Follow these steps:

1. Push your code to a Git repository (e.g., GitHub, GitLab).
2. Sign up for a Vercel account if you don't have one.
3. Import your repository into Vercel.
4. Configure the environment variables in Vercel to match those in your `.env` file.

### Admin Panel for Payload CMS

#### Blog

1. Log in.
2. Navigate to the "Collections" tab and select "Blog".
3. Click on "Create" to add a new blog post.

### Usage

1. You are welcome to use this template as a starting point for your own portfolio. It would be great if you could give me credit in your README or footer, but it is not required.
