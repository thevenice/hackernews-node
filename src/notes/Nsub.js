//
function newLinkSubscribe(parent, args, context, info) {
  // get $subscribe from newLink
  return context.prisma.$subscribe.link({ mutation_in: ["CREATED"] }).node();
}
// subscription resolver implementation
// the subscription resolver is provided as the value for a subscribe field inside an object.
const newLink = {
  subscribe: newLinkSubscribe,
  resolve: payload => {
    return payload;
  }
};
module.exports = { newLink };

// --- subs notes--
/**
 * What are GraphQL subscriptions?
Subscriptions are a GraphQL feature that allows a server to send data to its clients when a specific event happens. Subscriptions are usually implemented with WebSockets. In that setup, the server maintains a steady connection to its subscribed client. This also breaks the “Request-Response-Cycle” that were used for all previous interactions with the API.

Instead, the client initially opens up a long-lived connection to the server by sending a subscription query that specifies which event it is interested in. Every time this particular event happens, the server uses the connection to push the event data to the subscribed client(s).

Subscriptions with Prisma
Luckily, Prisma comes with out-of-the-box support for subscriptions.

For each model in your Prisma datamodel, Prisma lets you subscribe to the following events:

A new model is created
An existing model updated
An existing model is deleted
You can subscribe to these events using the $subscribe method of the Prisma client.

Subscribing to new Link elements
Enough with the talking, more of the coding! Let’s implement the subscription that allows your clients to subscribe to newly created Link elements.

Just like with queries and mutations, the first step to implement a subscription is to extend your GraphQL schema definition.
 * 
Next, go ahead and implement the resolver for the newLink field. Resolvers for subscriptions are slightly different than the ones for queries and mutations:

Rather than returning any data directly, they return an AsyncIterator which subsequently is used by the GraphQL server to push the event data to the client.
Subscription resolvers are wrapped inside an object and need to be provided as the value for a subscribe field. You also need to provide another field called resolve that actually returns the data from the data emitted by the AsyncIterator.

 *The code seems pretty straightforward. As mentioned before, the subscription resolver is provided as the value for a subscribe field inside a plain JavaScript object.

As mentioned, the prisma client instance on the context exposes a $subscribe property which proxies the subscriptions from the Prisma API. This function is used to resolve subscriptions and push the event data. Prisma is taking care of all the complexity of handling the realtime functionality under the hood.
 */
// --- subs notes--
