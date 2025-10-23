// // lib/wordpress.js - ДОБАВЛЯЕМ testWordPressConnection
// export async function getHomePageData() {
//   try {
//     const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL || 'http://localdev.test:8080/graphql', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         query: `
//           query GetHomePage {
//             pages(where: {name: "home"}) {
//               nodes {
//                 id
//                 title
//                 slug
//                 content
//                 heroFields {
//                   heroMode
//                   heroFrameCount
//                 }
//                 contentFields {
//                   contentFrameCount
//                   switchFrame
//                   firstTitle
//                   secondTitle
//                   firstSubtitle
//                   secondSubtitle
//                   firstDescription
//                   secondDescription
//                 }
//               }
//             }
//           }
            
//         `
//       }),
//       next: { revalidate: 60 }
//     });
    

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
    
//     if (data.errors) {
//       console.error('GraphQL errors:', data.errors);
//       return null;
//     }

//     return data?.data?.pages?.nodes?.[0] || null;

//   } catch (error) {
//     console.error('Error fetching home page:', error);
//     return null;
//   }
// }

// export async function getLatestNews() {
//   try {
//     const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL || 'http://localdev.test:8080/graphql', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         query: `
//           query GetNews($first: Int = 6) {
//             posts(where: {categoryName: "News"}, first: $first) {
//             nodes {
//                 id
//                 title
//                 news {
//                 newsTitle
//                 newsDescription2
//                 newsImage {
//                     node {
//                     id
//                     sourceUrl
//                     altText
//                     }
//                 }
//                 }
//             }
//             }
//         }
//         `
//       }),
//       next: { revalidate: 60 }
//     });
//     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
//     const data = await response.json();

//     if (data.errors) {
//       console.error('GraphQL errors:', data.errors);
//       return [];
//     }
    
//     return data?.data?.posts?.nodes || [];
//   } catch (error) {
//     console.error('Error fetching news:', error);
//     return [];
//   }
// }


// // ДОБАВЛЯЕМ НЕДОСТАЮЩУЮ ФУНКЦИЮ
// export async function testWordPressConnection() {
//   try {
//     const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL || 'http://localdev.test:8080/graphql', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         query: `
//           query TestConnection {
//             generalSettings {
//               title
//               url
//             }
//           }
//         `
//       }),
//     });

//     if (!response.ok) {
//       console.error('WordPress HTTP error:', response.status, response.statusText);
//       return false;
//     }

//     const data = await response.json();
    
//     if (data.errors) {
//       console.error('WordPress GraphQL errors:', data.errors);
//       return false;
//     }

//     console.log('✅ WordPress connected:', data.data?.generalSettings);
//     return true;

//   } catch (error) {
//     console.error('❌ WordPress connection failed:', error);
    
//     if (error.name === 'TypeError' && error.message.includes('fetch')) {
//       console.warn('💡 Подсказка: Проверьте что WordPress запущен и доступен по адресу:', 
//         process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL);
//     }
    
//     return false;
//   }
// }
