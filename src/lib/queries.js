// // lib/queries.js
// import { gql } from '@apollo/client';

// export const GET_HOME_PAGE = gql`
//   query GetHomePage {
//     pages(where: {name: "home"}) {
//       nodes {
//         id
//         title
//         slug
//         content
//         seo {
//           title
//           metaDesc
//         }
//         contentFields {
//           contentFrameCount
//           switchFrame
//           firstTitle
//           secondTitle
//           firstSubtitle
//           secondSubtitle
//           firstDescription
//           secondDescription
//         }
//         heroFields {
//           heroMode
//           heroFrameCount
//         }
//       }
//     }
//   }
// `;

// export const GET_NEWS = gql`
//   query GetNews($first: Int = 4) {
//     posts(where: {categoryName: "News"}, first: $first) {
//       nodes {
//         id
//         title
//         news {
//           newsTitle
//           newsDescription2
//           newsImage {
//             node {
//               id
//               sourceUrl
//               altText
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// export const GET_ALL_POSTS = gql`
//   query GetAllPosts($first: Int = 10) {
//     posts(first: $first) {
//       nodes {
//         id
//         title
//         excerpt
//         slug
//         date
//         author {
//           node {
//             name
//           }
//         }
//         featuredImage {
//           node {
//             sourceUrl
//             altText
//           }
//         }
//         categories {
//           nodes {
//             name
//             slug
//           }
//         }
//       }
//     }
//   }
// `;
