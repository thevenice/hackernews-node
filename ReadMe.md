<div>
  <h3>graphql-yoga</h3>
  <h4>
    graphql-yoga is a fully-featured GraphQL server. It is based on Express.js
    and a few other libraries to help you build production-ready GraphQL
    servers.
  </h4>
  <ul>
    <p>
      Here’s a list of its features:
    </p>

  <li>
      GraphQL spec-compliant
    </li>
    <li>
      Supports file upload
    </li>
    <li>
      Realtime functionality with GraphQL subscriptions
    </li>
    <li>
      Works with TypeScript typings
    </li>
    <li>
      Out-of-the-box support for GraphQL Playground
    </li>
    <li>
      Extensible via Express middlewares
    </li>
    <li>
      Resolves custom directives in your GraphQL schema
    </li>
    <li>
      Query performance tracing
    </li>
    <li>
      Accepts both application/json and application/graphql content-types
    </li>
    <li>
      Runs everywhere: Can be deployed via now, up, AWS Lambda, Heroku etc.
    </li>
  </ul>
</div>
<div>
  <h3>Additional Implementations</h3>
  <p>
    Most of the time, you also need to take care of many additional workflows
    such as authentication, authorization (permissions), pagination, filtering,
    realtime, integrating with 3rd-party services or legacy systems…
  </p>
  <p>
   client > API server(prsima client)>Prisma server > DB
  </p>
  
</div>
<div>
  <h3>Prisma setup</h3>
  <p>prisma folder > prisma.yml + datamodel.prisma</p>
  <p>
    prisma.yml is the main configuration file for your Prisma setup.
    datamodel.prisma on the other hand contains the definition of your
    datamodel. The Prisma datamodel defines your application’s models. Each
    model will be mapped to a table in the underlying database.
  </p>
  <h3>@unique keyword</h3>
<p>@unique directive generally tells Prisma that you never want any two Link elements in the database that have the same value for that field </p>
<h3>DateTime field</h3>
<p>
  new field called createdAt: DateTime!. This field is also managed by Prisma
  and will be read-only in the API. It stores the time for when a specific Link
  was created.
  read more : "https://www.prisma.io/docs/1.27/prisma-cli-and-configuration/prisma-yml-5cy7/"
</p>
<h3>
  Here’s a quick explanation of each property you see in that file:
</h3>
<ul>
  <li>
    endpoint: The HTTP endpoint for your Prisma API.
  </li>
  <li>
    datamodel: Points to the datamodel file which is the foundation for the
    Prisma client API that you’ll use in your API server.
  </li>

  <li>
    generate: Specifies in which language the Prisma client should be generated
    and where it will be located.
  </li>
</ul>

</div>
