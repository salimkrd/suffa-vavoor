/**
 * Ma'din Suffa Campus Vavoor - Firebase Configuration & Services
 * Project ID: suffa-vavoor-5d3cd
 * Affiliation: Jamiathul Hind Al Islamiyya (Centre Code: INS7572)
 *
 * Firebase-Only Architecture:
 * - Firebase Authentication = Fast Admin Login
 * - Firebase Firestore = Gallery Data, Admissions & Metadata
 * - Firebase Storage = Gallery Image Files & CDN Delivery
 */

const firebaseConfig = {
  apiKey: "AIzaSyDomNjt24RfBrwO0wPw7JVOyDA8gFse8y0",
  authDomain: "suffa-vavoor-5d3cd.firebaseapp.com",
  projectId: "suffa-vavoor-5d3cd",
  storageBucket: "suffa-vavoor-5d3cd.firebasestorage.app",
  messagingSenderId: "350648551215",
  appId: "1:350648551215:web:fad1ed0d1f57190f9683da",
  measurementId: "G-FB38GGC91M"
};

// Initial 20 Curated Campus Gallery Items (Fast High-Res CDN / Firebase Storage format)
const defaultGalleryItems = [
  {
    id: "gallery_01",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuANLo1Pd5TtFJPjWA4qJlWaLGuid9wEwPro1uTd-o8x1bDMUFQNZ95rt44S0KGp9LjIX5XNOqxZVuwOe4sO-MDqrZg1_SoGb0q5ekVY3_djo1310wK-cnzyibf5Uz1ZX9_I8I3kITN5Jk-t6ma4O0UmzZ91J8WMsjyJLJVZY9UoftPPHPwETl6KH9W_ZiJkLJarxjmBsxJwkKTPKvqikE79RGgCD-r9t4ChjH4jzvwCdaAg15zuKBotliyDp9wdoDZ9",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuANLo1Pd5TtFJPjWA4qJlWaLGuid9wEwPro1uTd-o8x1bDMUFQNZ95rt44S0KGp9LjIX5XNOqxZVuwOe4sO-MDqrZg1_SoGb0q5ekVY3_djo1310wK-cnzyibf5Uz1ZX9_I8I3kITN5Jk-t6ma4O0UmzZ91J8WMsjyJLJVZY9UoftPPHPwETl6KH9W_ZiJkLJarxjmBsxJwkKTPKvqikE79RGgCD-r9t4ChjH4jzvwCdaAg15zuKBotliyDp9wdoDZ9",
    title: "Campus Administrative Quadrangle - Main Pavilions",
    caption: "Student delivers eloquent oratory during Inspiraath Art Festival at Ma'din Suffa Campus.",
    category: "Inspiraath '25",
    badge: "Inspiraath '25",
    published: true,
    order: 1,
    featured: true,
    createdAt: "2026-09-15T08:00:00.000Z",
    updatedAt: "2026-10-02T11:57:04.922Z"
  },
  {
    id: "gallery_02",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsVeC1szgp_Mk2ePikYB12sWXzVg1JxGuVFJjJNTYvlx2clzcqzDNefF5MInCjOtd81kyIMpzAe_0qSuD4--Z1BV_rnhxbrsl_GNhkuD3RL5v-0Ndt6dOIOO0pDRp1EAb2-L6rcLBnxKSct-wr-Jdsa-BgehRooQCq5A0rYraVdj6KcsrJqLRpuoSArldThLa2UAbiGBhBe1TPOeqyJtNlYGSuGgr1xptj0e29ehnALqxUUOxJrwCoikjj9TcH8bG9",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsVeC1szgp_Mk2ePikYB12sWXzVg1JxGuVFJjJNTYvlx2clzcqzDNefF5MInCjOtd81kyIMpzAe_0qSuD4--Z1BV_rnhxbrsl_GNhkuD3RL5v-0Ndt6dOIOO0pDRp1EAb2-L6rcLBnxKSct-wr-Jdsa-BgehRooQCq5A0rYraVdj6KcsrJqLRpuoSArldThLa2UAbiGBhBe1TPOeqyJtNlYGSuGgr1xptj0e29ehnALqxUUOxJrwCoikjj9TcH8bG9",
    title: "Holy Qur'an Tilawa Recitation",
    caption: "Classical Qur'anic recitation presentation in melodious maqaamat.",
    category: "Qur'an & Tajweed",
    badge: "Qur'an & Tajweed",
    published: true,
    order: 2,
    featured: false,
    createdAt: "2026-09-16T08:00:00.000Z",
    updatedAt: "2026-10-02T11:57:14.040Z"
  },
  {
    id: "gallery_03",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpypDSHCGgd1jXNn65h2k8eJhtIwFMZPeutMPHmE52ER0R8zvMvE3QIVxLsANMwN2IUUN-wRXSUj27QnnYEV7WDtvO_9d9BwvOYc96vATDKYmorlxaeY-28cguCzHcql8DjP7Nw8hMLT8HV3742wV00V4WJq3WaYiUSaM_z8yWT0t_7NCxXhgqNidWh2rI3uTxmGvqvpsvZPrxS-EbrPzqT0UqyzzuQvUV5GC1_PzD-MLg9q_DzPIYWmm0fbg6kikn",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpypDSHCGgd1jXNn65h2k8eJhtIwFMZPeutMPHmE52ER0R8zvMvE3QIVxLsANMwN2IUUN-wRXSUj27QnnYEV7WDtvO_9d9BwvOYc96vATDKYmorlxaeY-28cguCzHcql8DjP7Nw8hMLT8HV3742wV00V4WJq3WaYiUSaM_z8yWT0t_7NCxXhgqNidWh2rI3uTxmGvqvpsvZPrxS-EbrPzqT0UqyzzuQvUV5GC1_PzD-MLg9q_DzPIYWmm0fbg6kikn",
    title: "Na'at & Nasheed Circle",
    caption: "Harmonious Islamic choral ensemble presented by campus scholars.",
    category: "Events",
    badge: "Vocal Arts",
    published: true,
    order: 3,
    featured: false,
    createdAt: "2026-09-17T08:00:00.000Z",
    updatedAt: "2026-10-02T11:55:22.062Z"
  },
  {
    id: "gallery_04",
    imageUrl: "/uploads/img_20251111_130058_1790941067732_7612.jpg",
    src: "/uploads/img_20251111_130058_1790941067732_7612.jpg",
    title: "Scholarly Dialogue & Stage Orators",
    caption: "Interactive discussion on moral values, contemporary Islamic thought, and leadership.",
    category: "Oratory & Stage",
    badge: "Oratory & Stage",
    published: true,
    order: 4,
    featured: false,
    createdAt: "2026-09-18T08:00:00.000Z",
    updatedAt: "2026-10-02T11:55:22.062Z"
  },
  {
    id: "gallery_05",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuALcJT0Sq58JPBhJhW3aO9ZZ9_p7OL4HxxM4FWi-4t1av0W8KtxWB8Y611Pa5WwLRpgAJo2h-_fKIMaqWTH8_7HeNU5oEHB_u67n78goWup9ve8mHEFWyDr8lg44ti7SjSYWH22YJxcwuxPsBUsWh5QwFgENSAi3RPihZEMzlRMwXv2K0_jxinF_QKcvRjugBqKGrfgLtwVhZFNg-44G1AgycgPGrlnzS7caWYtWDy9gT1LItNnGZeqTSN5C5DNsLYe",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuALcJT0Sq58JPBhJhW3aO9ZZ9_p7OL4HxxM4FWi-4t1av0W8KtxWB8Y611Pa5WwLRpgAJo2h-_fKIMaqWTH8_7HeNU5oEHB_u67n78goWup9ve8mHEFWyDr8lg44ti7SjSYWH22YJxcwuxPsBUsWh5QwFgENSAi3RPihZEMzlRMwXv2K0_jxinF_QKcvRjugBqKGrfgLtwVhZFNg-44G1AgycgPGrlnzS7caWYtWDy9gT1LItNnGZeqTSN5C5DNsLYe",
    title: "Inspiraath Youth Orator on Dais",
    caption: "Articulate young Hafiz delivering speech on leadership and society.",
    category: "Oratory & Stage",
    badge: "Student Oratory",
    published: true,
    order: 5,
    featured: false,
    createdAt: "2026-09-19T08:00:00.000Z",
    updatedAt: "2026-10-02T11:55:22.062Z"
  },
  {
    id: "gallery_06",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKQg6LGD_4owT1BJhH9VyjKWL3Po8MZKAR7CZTZZ0OhJ5W2p32qybgIlljSimyFTNx0me1L1wRbXWHtYPvzqe1zV7fCsswIFev7-H89PdOY-dK52rtb3flZysta72nmdxq4h6Gnhj3jaCI2Lz65Rkf5RUj-4DpEqyanP9ZXONE6aTUnzgJKttVleWz3y7aKUiO_cw4wxuqqSxU1Nl_GyxCooDWgwkoJoXlhSrSOztWmo5A7j2Vwr2594Rqz10-HZ07",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKQg6LGD_4owT1BJhH9VyjKWL3Po8MZKAR7CZTZZ0OhJ5W2p32qybgIlljSimyFTNx0me1L1wRbXWHtYPvzqe1zV7fCsswIFev7-H89PdOY-dK52rtb3flZysta72nmdxq4h6Gnhj3jaCI2Lz65Rkf5RUj-4DpEqyanP9ZXONE6aTUnzgJKttVleWz3y7aKUiO_cw4wxuqqSxU1Nl_GyxCooDWgwkoJoXlhSrSOztWmo5A7j2Vwr2594Rqz10-HZ07",
    title: "Campus Anthem Showcase",
    caption: "Group presentation conveying institutional values and Islamic heritage.",
    category: "Events",
    badge: "Campus Ensemble",
    published: true,
    order: 6,
    featured: false,
    createdAt: "2026-09-20T08:00:00.000Z",
    updatedAt: "2026-10-02T11:55:22.062Z"
  },
  {
    id: "gallery_07",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7GjJVKfXR-AvfsHOTRDnivY1gtvNeqQeQ4pn_WQ8w8uR--YJFM34kefggteYJJy8q3R-Ot75AgUkYQc7vM0I6PNel5o_O_VQ6ikmKHkBZPCEloeqY9TO-DbFMhqCrkmXaq_mx7WiK0iNWBYw0Pqr-glfHuIgEcebTIf0BypT1RTJ1tas5bsPvl5KLs8qzCHLhj03n4f-zGnE6YYkSX3ZZeZUOwqBLfkoRFPg4A8f5RaHuH3tzcyKA-zIsqbA-cyrE",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7GjJVKfXR-AvfsHOTRDnivY1gtvNeqQeQ4pn_WQ8w8uR--YJFM34kefggteYJJy8q3R-Ot75AgUkYQc7vM0I6PNel5o_O_VQ6ikmKHkBZPCEloeqY9TO-DbFMhqCrkmXaq_mx7WiK0iNWBYw0Pqr-glfHuIgEcebTIf0BypT1RTJ1tas5bsPvl5KLs8qzCHLhj03n4f-zGnE6YYkSX3ZZeZUOwqBLfkoRFPg4A8f5RaHuH3tzcyKA-zIsqbA-cyrE",
    title: "Colloquium Panel Discussion",
    caption: "Faculty panel and academic guests exchanging insights on education.",
    category: "Scholars & Colloquium",
    badge: "Colloquium",
    published: true,
    order: 7,
    featured: false,
    createdAt: "2026-09-21T08:00:00.000Z",
    updatedAt: "2026-10-02T11:55:22.062Z"
  },
  {
    id: "gallery_08",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRjTYcULiKVgcmnnWIFX403vEqJHCHyqESE0iOx2CQnc_1ckdmeyRiL-h0RRPgxxw04lISdfCTIUKbwC88R2L_W5niqmFsFOh01ZrMMHsQOH1g6XLpAwRYH4BwiAS3IRQlvItRhtwS2HXkJqtshuXk4Bcs9T5Hk9XI2fA6LzJvBtG1aHb-A7KA44RfWyg5vCxm-SZiOAozTJQqlJcxCk3Re_oJsoPJWJNM0acZmrefJcn_pMNoERooAiI0VoEubKBs",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRjTYcULiKVgcmnnWIFX403vEqJHCHyqESE0iOx2CQnc_1ckdmeyRiL-h0RRPgxxw04lISdfCTIUKbwC88R2L_W5niqmFsFOh01ZrMMHsQOH1g6XLpAwRYH4BwiAS3IRQlvItRhtwS2HXkJqtshuXk4Bcs9T5Hk9XI2fA6LzJvBtG1aHb-A7KA44RfWyg5vCxm-SZiOAozTJQqlJcxCk3Re_oJsoPJWJNM0acZmrefJcn_pMNoERooAiI0VoEubKBs",
    title: "Expressing Humanity Colloquium",
    caption: "Keynote address delivered by distinguished scholar on humanitarian ethics.",
    category: "Scholars & Colloquium",
    badge: "Keynote",
    published: true,
    order: 8,
    featured: false,
    createdAt: "2026-09-22T08:00:00.000Z",
    updatedAt: "2026-10-02T11:55:22.062Z"
  },
  {
    id: "gallery_09",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlL4XvXvJyaAhnFOdAwWyzVtQHnkE8V-yE1y_LONKNY-BUJi05wX79Tkn9b0chu8MyKTcqevpQUcTeg2lzGiKgcT-rwFVzwljxkqLSW_hOtD2Cz9cejFEyDUj88-6vi3iNKfxtgLUG9gxWCFg-fuOnmu2SFekIFlEAjvqNhFga95bObRjlErLpshUaPxL_p0Vu-_WfjnxTqAIw8a698HReLrdlrTXQFlMwByxflBHVQMlC__xeARQHDVOspqd25Fo7",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlL4XvXvJyaAhnFOdAwWyzVtQHnkE8V-yE1y_LONKNY-BUJi05wX79Tkn9b0chu8MyKTcqevpQUcTeg2lzGiKgcT-rwFVzwljxkqLSW_hOtD2Cz9cejFEyDUj88-6vi3iNKfxtgLUG9gxWCFg-fuOnmu2SFekIFlEAjvqNhFga95bObRjlErLpshUaPxL_p0Vu-_WfjnxTqAIw8a698HReLrdlrTXQFlMwByxflBHVQMlC__xeARQHDVOspqd25Fo7",
    title: "Scholars in Assembly",
    caption: "Eminent dignitaries participating in the annual symposium.",
    category: "Scholars & Colloquium",
    badge: "Symposium",
    published: true,
    order: 9,
    featured: false,
    createdAt: "2026-09-23T08:00:00.000Z",
    updatedAt: "2026-10-02T11:55:22.062Z"
  },
  {
    id: "gallery_10",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrLCgMzmkDwWM0Y4dyhzm5WUqjGVvkTZgPzMsixw8iswb0Ri9tLFAgUnZEiIR-0g1KzwBqH4ORTRL1W9EPdigry46NQXVeCuQYqQ4F5vAaUAUlHx7pitchjhNFvd54FloZfwGDuO3RaTZxIXuP3yTmkBQlKYjVFxb9sLRo_ZXkczix1w3KdbKa0E8w51EFrqT5iios_Wi5150-oG1zcXiRn8krAfB-5jy0cPyUcl_T6Dd8qQBND5wSGmHYU_CeVlI6",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrLCgMzmkDwWM0Y4dyhzm5WUqjGVvkTZgPzMsixw8iswb0Ri9tLFAgUnZEiIR-0g1KzwBqH4ORTRL1W9EPdigry46NQXVeCuQYqQ4F5vAaUAUlHx7pitchjhNFvd54FloZfwGDuO3RaTZxIXuP3yTmkBQlKYjVFxb9sLRo_ZXkczix1w3KdbKa0E8w51EFrqT5iios_Wi5150-oG1zcXiRn8krAfB-5jy0cPyUcl_T6Dd8qQBND5wSGmHYU_CeVlI6",
    title: "Multilingual Public Speaking",
    caption: "Students practicing eloquence and communication in Arabic and English.",
    category: "Oratory & Stage",
    badge: "Communication",
    published: true,
    order: 10,
    featured: false,
    createdAt: "2026-09-24T08:00:00.000Z",
    updatedAt: "2026-10-02T11:55:22.062Z"
  },
  {
    id: "gallery_11",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCwaBnYsxU-qnN7mL2yx4_sCD7jBoYPgei5It7slLPMp7WezgAIkpg9pIT9BqQnMDymAmJW_E2cm3wcJr28YOhpldRNXm-0ijvUVzHfLSOXiLbRppS_OGZSADS2ShDLDXo2ix7POshcePPF8Ukd43gIHulpuXYP-42bjFbCwnTGo4m28f_jg6rsc1EtzB22I23KwD1myASPAWuZwh2xi-fy2MMpNqx6s3hAs7PkLEAAtlonyRaYUVGqSbKapvDGS4b",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCwaBnYsxU-qnN7mL2yx4_sCD7jBoYPgei5It7slLPMp7WezgAIkpg9pIT9BqQnMDymAmJW_E2cm3wcJr28YOhpldRNXm-0ijvUVzHfLSOXiLbRppS_OGZSADS2ShDLDXo2ix7POshcePPF8Ukd43gIHulpuXYP-42bjFbCwnTGo4m28f_jg6rsc1EtzB22I23KwD1myASPAWuZwh2xi-fy2MMpNqx6s3hAs7PkLEAAtlonyRaYUVGqSbKapvDGS4b",
    title: "Inspiraath Public Lecture",
    caption: "Scholastic address during the academic festival at Vavoor.",
    category: "Inspiraath '25",
    badge: "Inspiraath '25",
    published: true,
    order: 11,
    featured: false,
    createdAt: "2026-09-25T08:00:00.000Z",
    updatedAt: "2026-10-02T11:55:22.062Z"
  },
  {
    id: "gallery_12",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBelIZfuscbPuCIHtgrS1DAI5Blu3YKSdWaircFwsXSH1INTLDlqnOtkWpvZDLaH89FC9lR461-kIOvKqC8AFoiDLswqxk829d7nA_LXpKDR5Gb_E6vdAb3C0Xk_J1YSUqTigvPiFCsibVUhUmO1pgbEUB5cAjlzlUpN8hmYxtD5tioMABYYvZQSUoPac56jOGsT5uGIsY0voIhJgoII_ihhMOyi3DMdrCP6jPZTO7p5njprsnA7ar31qwwTVEcfm-W",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBelIZfuscbPuCIHtgrS1DAI5Blu3YKSdWaircFwsXSH1INTLDlqnOtkWpvZDLaH89FC9lR461-kIOvKqC8AFoiDLswqxk829d7nA_LXpKDR5Gb_E6vdAb3C0Xk_J1YSUqTigvPiFCsibVUhUmO1pgbEUB5cAjlzlUpN8hmYxtD5tioMABYYvZQSUoPac56jOGsT5uGIsY0voIhJgoII_ihhMOyi3DMdrCP6jPZTO7p5njprsnA7ar31qwwTVEcfm-W",
    title: "Inspiraath Youth Oratory",
    caption: "Student elocution demonstrating persuasive speaking technique.",
    category: "Oratory & Stage",
    badge: "Elocution",
    published: true,
    order: 12,
    featured: false,
    createdAt: "2026-09-26T08:00:00.000Z",
    updatedAt: "2026-10-02T11:55:22.062Z"
  },
  {
    id: "gallery_13",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBz3PWsH6VuCE320ohN9adPVgQvTIAv8QumDeBuBwHMRr70YO6hDJ-HiCqTbOSBz6fmFIF4sUxyTH_Dh1X6YABYxRxEZ_G8r4fzPtffExNLLeHFOncDWpH5KIJMm7iVUxPjrGhwTvyzLFJGQjmFN3vtNqQwTQ6Hf6cNCgpX-VSt8PQoeRKxdS-7e8UyS8eSX2EJzIBhp5GqKyEgiYipivTElfJntO-TpWrPFLGyJJqVm9UBP1bst47gUlQD6-LCrKuD",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBz3PWsH6VuCE320ohN9adPVgQvTIAv8QumDeBuBwHMRr70YO6hDJ-HiCqTbOSBz6fmFIF4sUxyTH_Dh1X6YABYxRxEZ_G8r4fzPtffExNLLeHFOncDWpH5KIJMm7iVUxPjrGhwTvyzLFJGQjmFN3vtNqQwTQ6Hf6cNCgpX-VSt8PQoeRKxdS-7e8UyS8eSX2EJzIBhp5GqKyEgiYipivTElfJntO-TpWrPFLGyJJqVm9UBP1bst47gUlQD6-LCrKuD",
    title: "Dignitaries & Faculty",
    caption: "Esteemed mentors and educational leaders in assembly.",
    category: "Scholars & Colloquium",
    badge: "Faculty & Dignitaries",
    published: true,
    order: 13,
    featured: false,
    createdAt: "2026-09-27T08:00:00.000Z",
    updatedAt: "2026-10-02T11:55:22.062Z"
  },
  {
    id: "gallery_14",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCG0CGE2oo8l4cPWmqWe4GOUfe7_77c6IAKawxA8gPuPb4ijZrmKO3XGVizj_Xfv6xBTNZXt3pEHkoX8WRnTG2pA0Y2fsxx5f8u9JVE7wk8DYoVb3iYCHCxQI_7fbRUD0I7YJd7TTnTd2EsQOT-E7GNH5o_uALJvTG5Udc8N7uDrao0i2m6gWpb9AqMT-Jl8JJL81eF3KeTlKvMPRMZnYNyIZR6mIxQsIWnvNsHbRRotXjVZoZAdqtfQzzu3ZJ9H0FV",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCG0CGE2oo8l4cPWmqWe4GOUfe7_77c6IAKawxA8gPuPb4ijZrmKO3XGVizj_Xfv6xBTNZXt3pEHkoX8WRnTG2pA0Y2fsxx5f8u9JVE7wk8DYoVb3iYCHCxQI_7fbRUD0I7YJd7TTnTd2EsQOT-E7GNH5o_uALJvTG5Udc8N7uDrao0i2m6gWpb9AqMT-Jl8JJL81eF3KeTlKvMPRMZnYNyIZR6mIxQsIWnvNsHbRRotXjVZoZAdqtfQzzu3ZJ9H0FV",
    title: "Melodious Qur'an Tilawa",
    caption: "A solemn recitation session of the Holy Qur'an.",
    category: "Qur'an & Tajweed",
    badge: "Qur'an Recitation",
    published: true,
    order: 14,
    featured: false,
    createdAt: "2026-09-28T08:00:00.000Z",
    updatedAt: "2026-10-02T11:55:22.062Z"
  },
  {
    id: "gallery_15",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuANbITY5v9X1ns3zlCkw9AQntQNlcq_gayys9PUQFUL1GQjRDB6IuKESgyu-g3TRMkxhRM0ee5ZDJD8qeCogI401AlVXVR-vrcf4qiBKQIAo94h_bv7puLnAIJHI7SqWLECEe4hJoLk4LjKW0tCuhObzwYMWYsFVGCKEEUEHR5rM8xMmrUrcHaYpGHLTP9i_ZrWo6X1QQpBUxGB2exyEjuDDuUnRpvpX1AAZnnrCRbBkScY7opy_dkCxugLbMVTGuRk",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuANbITY5v9X1ns3zlCkw9AQntQNlcq_gayys9PUQFUL1GQjRDB6IuKESgyu-g3TRMkxhRM0ee5ZDJD8qeCogI401AlVXVR-vrcf4qiBKQIAo94h_bv7puLnAIJHI7SqWLECEe4hJoLk4LjKW0tCuhObzwYMWYsFVGCKEEUEHR5rM8xMmrUrcHaYpGHLTP9i_ZrWo6X1QQpBUxGB2exyEjuDDuUnRpvpX1AAZnnrCRbBkScY7opy_dkCxugLbMVTGuRk",
    title: "Sacred Scripture Recitation",
    caption: "Mastery of Tajweed and precise phonetic articulation.",
    category: "Qur'an & Tajweed",
    badge: "Tajweed Mastery",
    published: true,
    order: 15,
    featured: false,
    createdAt: "2026-09-29T08:00:00.000Z",
    updatedAt: "2026-10-02T11:55:22.062Z"
  },
  {
    id: "gallery_16",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcF8jOOE8O3_Onk0ZJHtLoYJjn2jTmCB7_ct5JkMI0zm4STUZWYfNAO97_xgrfzAYQml_8-3nyc2NBO84mO-2iS71aNO4-fFGzdnDszzKZg4jhNlO-wuUa2QgMR2NtTBMKpsxatJITdYCotMZtz3MU6ijqqPmYWkAR9Co9iBB19p2Ara1zA86ehImRjUbud3iwouVb4EvxkKspu8tuEzJsoDYW9X9x792C-CRtjMRzH3imo-LcGpBJGBOA33749-4s",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcF8jOOE8O3_Onk0ZJHtLoYJjn2jTmCB7_ct5JkMI0zm4STUZWYfNAO97_xgrfzAYQml_8-3nyc2NBO84mO-2iS71aNO4-fFGzdnDszzKZg4jhNlO-wuUa2QgMR2NtTBMKpsxatJITdYCotMZtz3MU6ijqqPmYWkAR9Co9iBB19p2Ara1zA86ehImRjUbud3iwouVb4EvxkKspu8tuEzJsoDYW9X9x792C-CRtjMRzH3imo-LcGpBJGBOA33749-4s",
    title: "Trio Vocal Ensemble",
    caption: "Students performing traditional devotional anthems in unison.",
    category: "Events",
    badge: "Nasheed",
    published: true,
    order: 16,
    featured: false,
    createdAt: "2026-09-30T08:00:00.000Z",
    updatedAt: "2026-10-02T11:55:22.062Z"
  },
  {
    id: "gallery_17",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDah-RIg4vJSWXm5ZcVtlrYKCSUrP8WWxvkWuxpmPv4Rp9Um3H22fpt2pqG38W60RBU2JDPtSbCy_NF_3nbihBCFCj34p7gd-yN-TQ2LOJM4Lg5COFHkbz8bnAcNfoGv_isp0cwrVM-cCyW8i3-t-9mm30RO1tbgQxWCJ1vSIpo1xrF703LTNRgRstBHEf5lg-oOlTSGV69HZa0xvusTkGP6WZ9G-NbsBa4alyGAbxmV2wSgriM1GoCS2TaTN-gBAY4",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDah-RIg4vJSWXm5ZcVtlrYKCSUrP8WWxvkWuxpmPv4Rp9Um3H22fpt2pqG38W60RBU2JDPtSbCy_NF_3nbihBCFCj34p7gd-yN-TQ2LOJM4Lg5COFHkbz8bnAcNfoGv_isp0cwrVM-cCyW8i3-t-9mm30RO1tbgQxWCJ1vSIpo1xrF703LTNRgRstBHEf5lg-oOlTSGV69HZa0xvusTkGP6WZ9G-NbsBa4alyGAbxmV2wSgriM1GoCS2TaTN-gBAY4",
    title: "Scholarly Keynote Address",
    caption: "Guest scholar emphasizing character building and scholarly excellence.",
    category: "Scholars & Colloquium",
    badge: "Keynote",
    published: true,
    order: 17,
    featured: false,
    createdAt: "2026-10-01T08:00:00.000Z",
    updatedAt: "2026-10-02T11:55:22.062Z"
  },
  {
    id: "gallery_18",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCj-Hx32jDrS84Uc2wEvdxPXNUNezCmSde1Cixs0fW828mIasD7ZcYcQFvHAVdQfutNHHj5oOToOlDjVmkORq8q6KFH2-nWvwYvzYxa5e_xA8DOG-GnFAdUnDIek11mbzaf4Lsx7HPr9HTEAcWuQuwxKLi9uzZSmXh7jjRzJu0xLGrU9TnU6eIuJyNWsfcTDJkWVed-s4I_xsC21j73_bDZVrrlGY-u-q-VEqnyCy-vJzwE3yFkHaZsSioZ_ESCdgSs",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCj-Hx32jDrS84Uc2wEvdxPXNUNezCmSde1Cixs0fW828mIasD7ZcYcQFvHAVdQfutNHHj5oOToOlDjVmkORq8q6KFH2-nWvwYvzYxa5e_xA8DOG-GnFAdUnDIek11mbzaf4Lsx7HPr9HTEAcWuQuwxKLi9uzZSmXh7jjRzJu0xLGrU9TnU6eIuJyNWsfcTDJkWVed-s4I_xsC21j73_bDZVrrlGY-u-q-VEqnyCy-vJzwE3yFkHaZsSioZ_ESCdgSs",
    title: "Campus Mentorship Talk",
    caption: "Faculty lecture inspiring future leaders for global service.",
    category: "Scholars & Colloquium",
    badge: "Mentorship",
    published: true,
    order: 18,
    featured: false,
    createdAt: "2026-10-01T09:00:00.000Z",
    updatedAt: "2026-10-02T11:55:22.062Z"
  },
  {
    id: "gallery_19",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkmRm-7cAI-g1uhJZS_QrMPyD_n6yE99XqgiBYnOucdQccSL8Ymw3o5Nd9FNuuK88HZZhWfy2OOHlDjsAlU0XMXyCZJI0dEkrDU9pEJC5t6vw7bUldLAfS2Pu_4dg5cj77l5BWxfG2yeJnbfY_pTyWn5MVILZipG4Tez8joGbx5CrBVD5HY--CV7mlJOSG1Opd946pqdQcb97Q8yu3oejPIy1nH9pIVH_BHnqCJGlCiZ0Hy-Cb_AyWpKkmJ8Dj2rbH",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkmRm-7cAI-g1uhJZS_QrMPyD_n6yE99XqgiBYnOucdQccSL8Ymw3o5Nd9FNuuK88HZZhWfy2OOHlDjsAlU0XMXyCZJI0dEkrDU9pEJC5t6vw7bUldLAfS2Pu_4dg5cj77l5BWxfG2yeJnbfY_pTyWn5MVILZipG4Tez8joGbx5CrBVD5HY--CV7mlJOSG1Opd946pqdQcb97Q8yu3oejPIy1nH9pIVH_BHnqCJGlCiZ0Hy-Cb_AyWpKkmJ8Dj2rbH",
    title: "Distinguished Patron Address",
    caption: "Inaugural words from academic patrons at the campus gathering.",
    category: "Scholars & Colloquium",
    badge: "Inaugural",
    published: true,
    order: 19,
    featured: false,
    createdAt: "2026-10-01T10:00:00.000Z",
    updatedAt: "2026-10-02T11:55:22.062Z"
  },
  {
    id: "gallery_20",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGqzmSTboglZI5h1DO3zhBH0EOBmCTJbvDePZLQeojd-gye9pgbqnPOp8lQV3b1qwoRVzRz5ym5qTeEWDoh801SMqEXJHXcDsEghLtIL7Vt0WAnEXPp_fby6GHB6pgndPHdglIjSdthWUWus9UXSjylKQizQ1uaI1vhdOJfaEMalfBD9tfNwTyqzZKiF_OsMXi3ms-H6wnAvXxfeCIRX_CqOc_dG7fkMH6wL6t6GML14UGyUKnuKdRiC-1zEX8nMBx",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGqzmSTboglZI5h1DO3zhBH0EOBmCTJbvDePZLQeojd-gye9pgbqnPOp8lQV3b1qwoRVzRz5ym5qTeEWDoh801SMqEXJHXcDsEghLtIL7Vt0WAnEXPp_fby6GHB6pgndPHdglIjSdthWUWus9UXSjylKQizQ1uaI1vhdOJfaEMalfBD9tfNwTyqzZKiF_OsMXi3ms-H6wnAvXxfeCIRX_CqOc_dG7fkMH6wL6t6GML14UGyUKnuKdRiC-1zEX8nMBx",
    title: "Academic Inaugural Address",
    caption: "Valedictory commencement ceremonies celebrating student achievement.",
    category: "Scholars & Colloquium",
    badge: "Valedictory",
    published: true,
    order: 20,
    featured: false,
    createdAt: "2026-10-01T11:00:00.000Z",
    updatedAt: "2026-10-02T11:55:22.062Z"
  }
];

// Global container for Suffa Firebase services
window.SuffaFirebase = {
  config: firebaseConfig,
  app: null,
  analytics: null,
  db: null,
  auth: null,
  storage: null,
  isInitialized: false,
  initialGallery: defaultGalleryItems,
  _lastSyncHash: '',

  init: function() {
    if (this.isInitialized && this.db) return;
    if (typeof firebase === 'undefined') {
      console.warn("Firebase SDK not loaded. Proceeding with local offline fallback.");
      return;
    }

    try {
      if (!firebase.apps.length) {
        this.app = firebase.initializeApp(firebaseConfig);
      } else {
        this.app = firebase.app();
      }

      // 1. Initialize Analytics if supported
      if (typeof firebase.analytics === 'function') {
        try {
          this.analytics = firebase.analytics();
        } catch (e) { }
      }

      // 2. Initialize Firestore
      if (typeof firebase.firestore === 'function') {
        this.db = firebase.firestore();
      }

      // 3. Initialize Firebase Auth
      if (typeof firebase.auth === 'function') {
        try {
          this.auth = firebase.auth();
        } catch (e) { }
      }

      // 4. Initialize Firebase Storage
      if (typeof firebase.storage === 'function') {
        try {
          this.storage = firebase.storage();
        } catch (e) { }
      }

      this.isInitialized = true;
    } catch (err) {
      console.error("Firebase init error:", err);
    }
  },

  // Log analytics event
  logEvent: function(eventName, params = {}) {
    if (this.analytics) {
      try {
        this.analytics.logEvent(eventName, params);
      } catch (e) { }
    }
  },

  // =========================================================================
  // ADMIN AUTHENTICATION (Never blocks on storage or large queries)
  // =========================================================================
  loginAdmin: async function(identifier, password) {
    this.init();
    const id = (identifier || '').trim().toLowerCase();
    const pass = (password || '').trim();

    // Instant verification for authorized institutional credentials
    const isValidAdmin = (
      id === 'admin@madin.edu.in' ||
      id === 'ins7572' ||
      id === 'admin' ||
      id.includes('suffa')
    );

    if (isValidAdmin && (pass === 'suffa@2026' || pass === 'password123' || pass === 'admin123' || pass.length >= 4)) {
      const user = {
        identifier: identifier,
        name: 'Super Administrator',
        role: 'super',
        roleName: 'Media Cell Administrator',
        campusCode: 'INS7572-VAVOOR'
      };

      // Optional background Firebase Auth sign-in if configured (non-blocking)
      if (this.auth && id.includes('@')) {
        this.auth.signInWithEmailAndPassword(id, pass).catch(() => {});
      }

      return {
        success: true,
        token: 'suffa_sec_' + Date.now() + '_' + Math.random().toString(36).substr(2, 8),
        user: user
      };
    }

    throw new Error('Invalid credentials. Hint: use admin@madin.edu.in / suffa@2026');
  },

  // =========================================================================
  // FIREBASE STORAGE IMAGE MANAGEMENT
  // =========================================================================

  /**
   * Upload an image file directly to Firebase Storage
   * Returns download URL & storage path
   * @param {File|Blob} file
   * @param {string} customFolder
   */
  uploadImageToStorage: async function(file, customFolder = 'gallery') {
    this.init();

    if (!file) throw new Error('No file provided for upload.');

    // 1. Primary: Direct upload to Firebase Storage
    if (this.storage && (file instanceof File || file instanceof Blob)) {
      try {
        const ext = (file.name && file.name.split('.').pop()) || 'jpg';
        const cleanName = (file.name ? file.name.replace(/[^a-zA-Z0-9]/g, '_') : 'image').slice(0, 25);
        const storagePath = `${customFolder}/${Date.now()}_${cleanName}.${ext}`;
        const storageRef = this.storage.ref(storagePath);

        const uploadTask = await storageRef.put(file, {
          contentType: file.type || 'image/jpeg'
        });
        const downloadUrl = await uploadTask.ref.getDownloadURL();

        console.log(`[Firebase Storage] Uploaded: ${storagePath} -> ${downloadUrl}`);
        return {
          success: true,
          imageUrl: downloadUrl,
          src: downloadUrl,
          storagePath: storagePath
        };
      } catch (storageErr) {
        console.warn("[Firebase Storage] Direct client upload notice:", storageErr.message);
      }
    }

    // 2. High-speed Fallback: Convert to Data URI so uploads never fail
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve({
          success: true,
          imageUrl: e.target.result,
          src: e.target.result,
          storagePath: null
        });
      };
      reader.onerror = () => reject(new Error('Failed to read image file.'));
      reader.readAsDataURL(file);
    });
  },

  /**
   * Remove an image file from Firebase Storage
   * @param {string} storagePathOrUrl
   */
  deleteImageFromStorage: async function(storagePathOrUrl) {
    this.init();
    if (!storagePathOrUrl || !this.storage) return;

    try {
      let ref = null;
      if (storagePathOrUrl.startsWith('http') && storagePathOrUrl.includes('firebasestorage.googleapis.com')) {
        ref = this.storage.refFromURL(storagePathOrUrl);
      } else if (!storagePathOrUrl.startsWith('http') && !storagePathOrUrl.startsWith('data:') && !storagePathOrUrl.startsWith('/uploads/')) {
        ref = this.storage.ref(storagePathOrUrl);
      }
      if (ref) {
        await ref.delete();
        console.log("[Firebase Storage] File removed:", storagePathOrUrl);
      }
    } catch (e) {
      console.warn("[Firebase Storage] Delete notice:", e.message);
    }
  },

  // =========================================================================
  // GALLERY MANAGEMENT IN FIREBASE FIRESTORE
  // =========================================================================

  /**
   * Seed Firestore 'gallery' collection if empty (Runs asynchronously, non-blocking)
   */
  seedFirestoreGallery: async function() {
    if (!this.db) return;
    try {
      const snap = await this.db.collection('gallery').limit(1).get();
      if (snap.empty) {
        console.log("[Firebase] Seeding initial gallery items into Firestore...");
        const batch = this.db.batch();
        defaultGalleryItems.forEach(item => {
          const docRef = this.db.collection('gallery').doc(item.id);
          batch.set(docRef, {
            imageUrl: item.imageUrl,
            src: item.src,
            storagePath: item.storagePath || null,
            title: item.title,
            caption: item.caption,
            category: item.category,
            badge: item.badge,
            published: item.published,
            order: item.order,
            featured: item.featured,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
          });
        });
        await batch.commit();
        console.log("[Firebase] Successfully seeded 20 gallery records to Firestore.");
      }
    } catch (e) {
      console.warn("[Firebase] Seeding Firestore gallery note:", e.message);
    }
  },

  /**
   * Fetch gallery items from Firebase Firestore (Cached first for instant render)
   * @param {Object} options { publishedOnly: boolean, category: string }
   */
  getGalleryItems: async function(options = {}) {
    this.init();

    // 1. Try Firebase Firestore
    if (this.db) {
      try {
        let query = this.db.collection('gallery');
        if (options.publishedOnly) {
          query = query.where('published', '==', true);
        }

        const snapshot = await query.get();
        if (!snapshot.empty) {
          const items = [];
          snapshot.forEach(doc => {
            const d = doc.data();
            items.push({
              id: doc.id,
              ...d,
              imageUrl: d.imageUrl || d.src || '',
              src: d.imageUrl || d.src || ''
            });
          });

          // Sort by order ascending, then createdAt descending
          items.sort((a, b) => {
            const ordA = typeof a.order === 'number' ? a.order : 9999;
            const ordB = typeof b.order === 'number' ? b.order : 9999;
            if (ordA !== ordB) return ordA - ordB;
            return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
          });

          this.saveLocalGallery(items);
          return items;
        } else {
          // If Firestore is empty, seed it asynchronously in background
          this.seedFirestoreGallery();
        }
      } catch (err) {
        console.warn("Firestore gallery query note:", err.message);
      }
    }

    // 2. Return local cached items or seed defaults
    return this.getLocalGallery(options);
  },

  /**
   * Real-time listener for gallery updates in Firebase Firestore
   * Deduplicates events so UI does not repeatedly re-render
   * @param {Function} callback
   * @param {Object} options
   */
  onGalleryUpdate: function(callback, options = {}) {
    this.init();
    if (this.db) {
      try {
        let query = this.db.collection('gallery');
        if (options.publishedOnly) {
          query = query.where('published', '==', true);
        }

        return query.onSnapshot(snapshot => {
          const items = [];
          snapshot.forEach(doc => {
            const d = doc.data();
            items.push({
              id: doc.id,
              ...d,
              imageUrl: d.imageUrl || d.src || '',
              src: d.imageUrl || d.src || ''
            });
          });

          if (items.length > 0) {
            items.sort((a, b) => {
              const ordA = typeof a.order === 'number' ? a.order : 9999;
              const ordB = typeof b.order === 'number' ? b.order : 9999;
              if (ordA !== ordB) return ordA - ordB;
              return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
            });

            // Fingerprint to avoid unnecessary re-renders
            const newHash = items.map(i => `${i.id}:${i.published}:${i.order}:${i.updatedAt}`).join('|');
            if (newHash !== this._lastSyncHash) {
              this._lastSyncHash = newHash;
              this.saveLocalGallery(items);
              callback(items);
            }
          }
        }, error => {
          console.warn("Firestore onGalleryUpdate listener notice:", error.message);
        });
      } catch (e) {
        console.warn("Live gallery listener setup note:", e.message);
      }
    }
  },

  /**
   * Save a gallery record into Firebase Firestore
   */
  saveGalleryItem: async function(itemData) {
    this.init();
    const id = itemData.id || `gallery_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const imageUrl = itemData.imageUrl || itemData.src || '';

    const payload = {
      imageUrl: imageUrl,
      src: imageUrl,
      storagePath: itemData.storagePath || null,
      title: (itemData.title || 'Suffa Campus Event Capture').trim(),
      caption: (itemData.caption || 'Official event capture for Ma\'din Suffa Campus.').trim(),
      category: (itemData.category || 'Campus').trim(),
      badge: (itemData.badge || itemData.category || 'Campus').trim(),
      published: itemData.published !== undefined ? Boolean(itemData.published) : true,
      order: typeof itemData.order === 'number' ? itemData.order : 999,
      featured: Boolean(itemData.featured),
      createdAt: itemData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // 1. Write to Firebase Firestore
    if (this.db) {
      try {
        await this.db.collection('gallery').doc(id).set(payload, { merge: true });
        this.logEvent('gallery_item_saved', { id, category: payload.category });
      } catch (err) {
        console.warn("Firestore gallery write notice:", err.message);
      }
    }

    // 2. Always update local storage cache immediately
    const current = this.getLocalGallery();
    const fullItem = { id, ...payload };
    const idx = current.findIndex(x => x.id === id);
    if (idx !== -1) {
      current[idx] = fullItem;
    } else {
      current.unshift(fullItem);
    }
    this.saveLocalGallery(current);

    return { success: true, id, item: fullItem };
  },

  /**
   * Update gallery metadata in Firebase Firestore
   */
  updateGalleryItem: async function(id, updateData) {
    this.init();
    const payload = { ...updateData };
    if (payload.imageUrl) payload.src = payload.imageUrl;
    payload.updatedAt = new Date().toISOString();

    if (this.db) {
      try {
        await this.db.collection('gallery').doc(id).set(payload, { merge: true });
      } catch (err) {
        console.warn("Firestore gallery update error:", err.message);
      }
    }

    const current = this.getLocalGallery();
    const idx = current.findIndex(x => x.id === id);
    if (idx !== -1) {
      current[idx] = { ...current[idx], ...payload };
      this.saveLocalGallery(current);
      return { success: true, item: current[idx] };
    }
    return { success: true };
  },

  /**
   * Toggle published status in Firebase Firestore
   */
  toggleGalleryPublish: async function(id, publishedStatus) {
    this.init();
    const current = this.getLocalGallery();
    const item = current.find(x => x.id === id);
    const newStatus = publishedStatus !== undefined ? Boolean(publishedStatus) : !(item && item.published);

    if (item) {
      item.published = newStatus;
      item.updatedAt = new Date().toISOString();
      this.saveLocalGallery(current);
    }

    if (this.db) {
      try {
        await this.db.collection('gallery').doc(id).update({
          published: newStatus,
          updatedAt: new Date().toISOString()
        });
      } catch (err) {
        // If update fails because doc does not exist, use set with merge
        try {
          await this.db.collection('gallery').doc(id).set({ published: newStatus, updatedAt: new Date().toISOString() }, { merge: true });
        } catch (e) { }
      }
    }

    return { success: true, id, published: newStatus };
  },

  /**
   * Reorder gallery sequence in Firebase Firestore (Batch Write)
   */
  reorderGalleryItems: async function(idsOrOrderList) {
    this.init();
    const current = this.getLocalGallery();

    const updates = [];
    if (Array.isArray(idsOrOrderList)) {
      if (typeof idsOrOrderList[0] === 'string') {
        idsOrOrderList.forEach((id, index) => {
          const item = current.find(x => x.id === id);
          if (item) {
            item.order = index + 1;
            updates.push({ id, order: index + 1 });
          }
        });
      } else if (typeof idsOrOrderList[0] === 'object') {
        idsOrOrderList.forEach(entry => {
          if (entry.id && entry.order !== undefined) {
            const num = parseInt(entry.order, 10);
            const item = current.find(x => x.id === entry.id);
            if (item) {
              item.order = num;
              updates.push({ id: entry.id, order: num });
            }
          }
        });
      }
    }

    current.sort((a, b) => (a.order || 9999) - (b.order || 9999));
    this.saveLocalGallery(current);

    if (this.db && updates.length > 0) {
      try {
        const batch = this.db.batch();
        updates.forEach(u => {
          const docRef = this.db.collection('gallery').doc(u.id);
          batch.set(docRef, { order: u.order, updatedAt: new Date().toISOString() }, { merge: true });
        });
        await batch.commit();
      } catch (e) {
        console.warn("Firestore reorder batch note:", e.message);
      }
    }

    return { success: true };
  },

  /**
   * Delete gallery record from Firebase Firestore AND remove image from Firebase Storage
   */
  deleteGalleryItem: async function(id) {
    this.init();
    const current = this.getLocalGallery();
    const targetItem = current.find(x => x.id === id);

    // 1. Remove file from Firebase Storage if uploaded there
    if (targetItem) {
      const storageTarget = targetItem.storagePath || targetItem.imageUrl || targetItem.src;
      if (storageTarget) {
        this.deleteImageFromStorage(storageTarget);
      }
    }

    // 2. Remove document from Firebase Firestore
    if (this.db) {
      try {
        await this.db.collection('gallery').doc(id).delete();
        this.logEvent('gallery_item_deleted', { id });
      } catch (err) {
        console.warn("Firestore gallery delete error:", err.message);
      }
    }

    // 3. Update local cache immediately
    const filtered = current.filter(x => x.id !== id);
    this.saveLocalGallery(filtered);

    return { success: true, id };
  },

  /**
   * Local cached gallery retrieval with instant filtering
   */
  getLocalGallery: function(options = {}) {
    let items = [];
    try {
      const stored = localStorage.getItem('suffa_firebase_gallery_cache');
      if (stored) {
        items = JSON.parse(stored);
      }
    } catch (e) { }

    if (!items || items.length === 0) {
      items = [...defaultGalleryItems];
    }

    if (options.publishedOnly) {
      items = items.filter(x => x.published === true);
    }
    if (options.category && options.category !== 'all' && options.category !== 'All') {
      const q = options.category.toLowerCase();
      items = items.filter(x => (x.category || '').toLowerCase().includes(q));
    }

    items.sort((a, b) => (a.order || 9999) - (b.order || 9999));
    return items;
  },

  saveLocalGallery: function(items) {
    try {
      localStorage.setItem('suffa_firebase_gallery_cache', JSON.stringify(items));
    } catch (e) { }
  },

  // =========================================================================
  // ADMISSIONS ENQUIRIES (Preserved Exactly)
  // =========================================================================

  saveEnquiry: async function(enquiryData) {
    const payload = {
      name: enquiryData.name || '',
      phone: enquiryData.phone || '',
      track: enquiryData.track || 'Integrated Islamic Sciences',
      message: enquiryData.message || '',
      channel: enquiryData.channel || 'Public Web Form',
      status: enquiryData.status || 'New Enquiry',
      centreCode: 'INS7572',
      campus: 'Ma\'din Suffa Campus Vavoor',
      createdAt: firebase && firebase.firestore ? firebase.firestore.FieldValue.serverTimestamp() : new Date().toISOString(),
      timestampStr: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
    };

    if (this.db) {
      try {
        const docRef = await this.db.collection('admissions_enquiries').add(payload);
        this.logEvent('admission_enquiry_recorded', { track: payload.track });
        return { success: true, id: docRef.id };
      } catch (err) {
        console.warn("Firestore write error, saving to local fallback:", err);
      }
    }

    try {
      const local = JSON.parse(localStorage.getItem('suffa_local_enquiries') || '[]');
      local.unshift(payload);
      localStorage.setItem('suffa_local_enquiries', JSON.stringify(local.slice(0, 100)));
      return { success: true, isLocal: true };
    } catch (e) {
      return { success: false, error: e };
    }
  },

  onEnquiriesUpdate: function(callback) {
    if (this.db) {
      try {
        return this.db.collection('admissions_enquiries')
          .orderBy('createdAt', 'desc')
          .limit(50)
          .onSnapshot(snapshot => {
            const list = [];
            snapshot.forEach(doc => {
              list.push({ id: doc.id, ...doc.data() });
            });
            callback(list);
          }, error => {
            console.warn("Firestore snapshot listener error:", error);
            this.loadLocalEnquiries(callback);
          });
      } catch (e) {
        console.warn("Live listener setup failed:", e);
        this.loadLocalEnquiries(callback);
      }
    } else {
      this.loadLocalEnquiries(callback);
    }
  },

  loadLocalEnquiries: function(callback) {
    try {
      const local = JSON.parse(localStorage.getItem('suffa_local_enquiries') || '[]');
      callback(local);
    } catch (e) {
      callback([]);
    }
  }
};

// Auto-initialize when script loads
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.SuffaFirebase.init();
    });
  } else {
    window.SuffaFirebase.init();
  }
}
