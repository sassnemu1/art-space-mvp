// // lib/apollo-client.js - ОБНОВЛЕНО ДЛЯ APOLLO CLIENT 4.0
// import { 
//   ApolloClient, 
//   InMemoryCache,
//   HttpLink,  // НОВЫЙ ИМПОРТ - класс вместо функции
//   ApolloLink 
// } from '@apollo/client';
// import { onError } from '@apollo/client/link/error';

// // HTTP Link с новым синтаксисом Apollo 4.0
// const httpLink = new HttpLink({  // new HttpLink() вместо createHttpLink()
//   uri: process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL || 'http://localdev.test:8080/graphql',
//   // Дополнительные настройки для WordPress
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Error Link для обработки ошибок
// const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
//   if (graphQLErrors) {
//     graphQLErrors.forEach(({ message, locations, path }) => {
//       console.error(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       );
//     });
//   }

//   if (networkError) {
//     console.error(`[Network error]: ${networkError}`);
    
//     // Специальная обработка для WordPress недоступности
//     if (networkError.code === 'ECONNREFUSED') {
//       console.warn('🔄 WordPress сервер недоступен. Проверьте что он запущен на:', 
//         process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL);
//     }
//   }
// });

// // Создаем Apollo Client с новым синтаксисом Apollo 4.0
// const client = new ApolloClient({
//   link: ApolloLink.from([errorLink, httpLink]), // ApolloLink.from() вместо from()
//   cache: new InMemoryCache({
//     typePolicies: {
//       Page: {
//         fields: {
//           heroFields: {
//             merge: true,
//           },
//           contentFields: {
//             merge: true,
//           }
//         }
//       }
//     }
//   }),
//   defaultOptions: {
//     watchQuery: {
//       errorPolicy: 'all',
//     },
//     query: {
//       errorPolicy: 'all',
//     },
//   },
//   // Для SSR в Next.js
//   ssrMode: typeof window === 'undefined',
// });

// export default client;
