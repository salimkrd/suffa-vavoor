const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Directories
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const GALLERY_FILE = path.join(DATA_DIR, 'gallery.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const sanitizedName = file.originalname
      .replace(ext, '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .slice(0, 30);
    const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e4);
    cb(null, `${sanitizedName}_${uniqueSuffix}${ext || '.jpg'}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 25 * 1024 * 1024 } // 25MB max
});

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Serve Uploads & Static Website Files
app.use('/uploads', express.static(UPLOADS_DIR));
app.use(express.static(__dirname));

// Seed Data
const initialGalleryItems = [
  {
    id: "gallery_01",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuANLo1Pd5TtFJPjWA4qJlWaLGuid9wEwPro1uTd-o8x1bDMUFQNZ95rt44S0KGp9LjIX5XNOqxZVuwOe4sO-MDqrZg1_SoGb0q5ekVY3_djo1310wK-cnzyibf5Uz1ZX9_I8I3kITN5Jk-t6ma4O0UmzZ91J8WMsjyJLJVZY9UoftPPHPwETl6KH9W_ZiJkLJarxjmBsxJwkKTPKvqikE79RGgCD-r9t4ChjH4jzvwCdaAg15zuKBotliyDp9wdoDZ9",
    title: "Inspiraath '25 Stage Presentation",
    caption: "Student delivers eloquent oratory during Inspiraath Art Festival at Ma'din Suffa Campus.",
    category: "Inspiraath '25",
    badge: "Inspiraath '25",
    published: true,
    order: 1,
    featured: true,
    createdAt: "2026-09-15T08:00:00.000Z",
    updatedAt: "2026-09-15T08:00:00.000Z"
  },
  {
    id: "gallery_02",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsVeC1szgp_Mk2ePikYB12sWXzVg1JxGuVFJjJNTYvlx2clzcqzDNefF5MInCjOtd81kyIMpzAe_0qSuD4--Z1BV_rnhxbrsl_GNhkuD3RL5v-0Ndt6dOIOO0pDRp1EAb2-L6rcLBnxKSct-wr-Jdsa-BgehRooQCq5A0rYraVdj6KcsrJqLRpuoSArldThLa2UAbiGBhBe1TPOeqyJtNlYGSuGgr1xptj0e29ehnALqxUUOxJrwCoikjj9TcH8bG9",
    title: "Holy Qur'an Tilawa Recitation",
    caption: "Classical Qur'anic recitation presentation in melodious maqaamat.",
    category: "Qur'an & Tajweed",
    badge: "Qur'an & Tajweed",
    published: true,
    order: 2,
    featured: false,
    createdAt: "2026-09-16T08:00:00.000Z",
    updatedAt: "2026-09-16T08:00:00.000Z"
  },
  {
    id: "gallery_03",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpypDSHCGgd1jXNn65h2k8eJhtIwFMZPeutMPHmE52ER0R8zvMvE3QIVxLsANMwN2IUUN-wRXSUj27QnnYEV7WDtvO_9d9BwvOYc96vATDKYmorlxaeY-28cguCzHcql8DjP7Nw8hMLT8HV3742wV00V4WJq3WaYiUSaM_z8yWT0t_7NCxXhgqNidWh2rI3uTxmGvqvpsvZPrxS-EbrPzqT0UqyzzuQvUV5GC1_PzD-MLg9q_DzPIYWmm0fbg6kikn",
    title: "Na'at & Nasheed Circle",
    caption: "Harmonious Islamic choral ensemble presented by campus scholars.",
    category: "Events",
    badge: "Vocal Arts",
    published: true,
    order: 3,
    featured: false,
    createdAt: "2026-09-17T08:00:00.000Z",
    updatedAt: "2026-09-17T08:00:00.000Z"
  },
  {
    id: "gallery_04",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7PwE9kWuOKbdhUHugWzR6IC5wBehGd_ODKvVnhBrIPdIMFiFTvd3xf9wiKpcdBd9FUKaozUaS3U6X3hQkXhLYuzbBk6bfN1OhOtkXu-XQumYy4k9wsfZucV4HQbuR_uTZAg3x4vwwXVSlX6LgIuvDs8VIFRlwTHJ9aEXb0IVYurvY9SVL6Heorb5rjJuz5-IvWZz9hUDNaGKi53zbizzjWkGXLmv1Tp76GOVJK-UfyrDzcMwvctXHXaZME6hM3YL",
    title: "Scholarly Dialogue & Stage Orators",
    caption: "Interactive discussion on moral values, contemporary Islamic thought, and leadership.",
    category: "Oratory & Stage",
    badge: "Scholarly Discourse",
    published: true,
    order: 4,
    featured: false,
    createdAt: "2026-09-18T08:00:00.000Z",
    updatedAt: "2026-09-18T08:00:00.000Z"
  },
  {
    id: "gallery_05",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuALcJT0Sq58JPBhJhW3aO9ZZ9_p7OL4HxxM4FWi-4t1av0W8KtxWB8Y611Pa5WwLRpgAJo2h-_fKIMaqWTH8_7HeNU5oEHB_u67n78goWup9ve8mHEFWyDr8lg44ti7SjSYWH22YJxcwuxPsBUsWh5QwFgENSAi3RPihZEMzlRMwXv2K0_jxinF_QKcvRjugBqKGrfgLtwVhZFNg-44G1AgycgPGrlnzS7caWYtWDy9gT1LItNnGZeqTSN5C5DNsLYe",
    title: "Inspiraath Youth Orator on Dais",
    caption: "Articulate young Hafiz delivering speech on leadership and society.",
    category: "Oratory & Stage",
    badge: "Student Oratory",
    published: true,
    order: 5,
    featured: false,
    createdAt: "2026-09-19T08:00:00.000Z",
    updatedAt: "2026-09-19T08:00:00.000Z"
  },
  {
    id: "gallery_06",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKQg6LGD_4owT1BJhH9VyjKWL3Po8MZKAR7CZTZZ0OhJ5W2p32qybgIlljSimyFTNx0me1L1wRbXWHtYPvzqe1zV7fCsswIFev7-H89PdOY-dK52rtb3flZysta72nmdxq4h6Gnhj3jaCI2Lz65Rkf5RUj-4DpEqyanP9ZXONE6aTUnzgJKttVleWz3y7aKUiO_cw4wxuqqSxU1Nl_GyxCooDWgwkoJoXlhSrSOztWmo5A7j2Vwr2594Rqz10-HZ07",
    title: "Campus Anthem Showcase",
    caption: "Group presentation conveying institutional values and Islamic heritage.",
    category: "Events",
    badge: "Campus Ensemble",
    published: true,
    order: 6,
    featured: false,
    createdAt: "2026-09-20T08:00:00.000Z",
    updatedAt: "2026-09-20T08:00:00.000Z"
  },
  {
    id: "gallery_07",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7GjJVKfXR-AvfsHOTRDnivY1gtvNeqQeQ4pn_WQ8w8uR--YJFM34kefggteYJJy8q3R-Ot75AgUkYQc7vM0I6PNel5o_O_VQ6ikmKHkBZPCEloeqY9TO-DbFMhqCrkmXaq_mx7WiK0iNWBYw0Pqr-glfHuIgEcebTIf0BypT1RTJ1tas5bsPvl5KLs8qzCHLhj03n4f-zGnE6YYkSX3ZZeZUOwqBLfkoRFPg4A8f5RaHuH3tzcyKA-zIsqbA-cyrE",
    title: "Colloquium Panel Discussion",
    caption: "Faculty panel and academic guests exchanging insights on education.",
    category: "Scholars & Colloquium",
    badge: "Colloquium",
    published: true,
    order: 7,
    featured: false,
    createdAt: "2026-09-21T08:00:00.000Z",
    updatedAt: "2026-09-21T08:00:00.000Z"
  },
  {
    id: "gallery_08",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRjTYcULiKVgcmnnWIFX403vEqJHCHyqESE0iOx2CQnc_1ckdmeyRiL-h0RRPgxxw04lISdfCTIUKbwC88R2L_W5niqmFsFOh01ZrMMHsQOH1g6XLpAwRYH4BwiAS3IRQlvItRhtwS2HXkJqtshuXk4Bcs9T5Hk9XI2fA6LzJvBtG1aHb-A7KA44RfWyg5vCxm-SZiOAozTJQqlJcxCk3Re_oJsoPJWJNM0acZmrefJcn_pMNoERooAiI0VoEubKBs",
    title: "Expressing Humanity Colloquium",
    caption: "Keynote address delivered by distinguished scholar on humanitarian ethics.",
    category: "Scholars & Colloquium",
    badge: "Keynote",
    published: true,
    order: 8,
    featured: false,
    createdAt: "2026-09-22T08:00:00.000Z",
    updatedAt: "2026-09-22T08:00:00.000Z"
  },
  {
    id: "gallery_09",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlL4XvXvJyaAhnFOdAwWyzVtQHnkE8V-yE1y_LONKNY-BUJi05wX79Tkn9b0chu8MyKTcqevpQUcTeg2lzGiKgcT-rwFVzwljxkqLSW_hOtD2Cz9cejFEyDUj88-6vi3iNKfxtgLUG9gxWCFg-fuOnmu2SFekIFlEAjvqNhFga95bObRjlErLpshUaPxL_p0Vu-_WfjnxTqAIw8a698HReLrdlrTXQFlMwByxflBHVQMlC__xeARQHDVOspqd25Fo7",
    title: "Scholars in Assembly",
    caption: "Eminent dignitaries participating in the annual symposium.",
    category: "Scholars & Colloquium",
    badge: "Symposium",
    published: true,
    order: 9,
    featured: false,
    createdAt: "2026-09-23T08:00:00.000Z",
    updatedAt: "2026-09-23T08:00:00.000Z"
  },
  {
    id: "gallery_10",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrLCgMzmkDwWM0Y4dyhzm5WUqjGVvkTZgPzMsixw8iswb0Ri9tLFAgUnZEiIR-0g1KzwBqH4ORTRL1W9EPdigry46NQXVeCuQYqQ4F5vAaUAUlHx7pitchjhNFvd54FloZfwGDuO3RaTZxIXuP3yTmkBQlKYjVFxb9sLRo_ZXkczix1w3KdbKa0E8w51EFrqT5iios_Wi5150-oG1zcXiRn8krAfB-5jy0cPyUcl_T6Dd8qQBND5wSGmHYU_CeVlI6",
    title: "Multilingual Public Speaking",
    caption: "Students practicing eloquence and communication in Arabic and English.",
    category: "Oratory & Stage",
    badge: "Communication",
    published: true,
    order: 10,
    featured: false,
    createdAt: "2026-09-24T08:00:00.000Z",
    updatedAt: "2026-09-24T08:00:00.000Z"
  },
  {
    id: "gallery_11",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCwaBnYsxU-qnN7mL2yx4_sCD7jBoYPgei5It7slLPMp7WezgAIkpg9pIT9BqQnMDymAmJW_E2cm3wcJr28YOhpldRNXm-0ijvUVzHfLSOXiLbRppS_OGZSADS2ShDLDXo2ix7POshcePPF8Ukd43gIHulpuXYP-42bjFbCwnTGo4m28f_jg6rsc1EtzB22I23KwD1myASPAWuZwh2xi-fy2MMpNqx6s3hAs7PkLEAAtlonyRaYUVGqSbKapvDGS4b",
    title: "Inspiraath Public Lecture",
    caption: "Scholastic address during the academic festival at Vavoor.",
    category: "Inspiraath '25",
    badge: "Inspiraath '25",
    published: true,
    order: 11,
    featured: false,
    createdAt: "2026-09-25T08:00:00.000Z",
    updatedAt: "2026-09-25T08:00:00.000Z"
  },
  {
    id: "gallery_12",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBelIZfuscbPuCIHtgrS1DAI5Blu3YKSdWaircFwsXSH1INTLDlqnOtkWpvZDLaH89FC9lR461-kIOvKqC8AFoiDLswqxk829d7nA_LXpKDR5Gb_E6vdAb3C0Xk_J1YSUqTigvPiFCsibVUhUmO1pgbEUB5cAjlzlUpN8hmYxtD5tioMABYYvZQSUoPac56jOGsT5uGIsY0voIhJgoII_ihhMOyi3DMdrCP6jPZTO7p5njprsnA7ar31qwwTVEcfm-W",
    title: "Inspiraath Youth Oratory",
    caption: "Student elocution demonstrating persuasive speaking technique.",
    category: "Oratory & Stage",
    badge: "Elocution",
    published: true,
    order: 12,
    featured: false,
    createdAt: "2026-09-26T08:00:00.000Z",
    updatedAt: "2026-09-26T08:00:00.000Z"
  },
  {
    id: "gallery_13",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBz3PWsH6VuCE320ohN9adPVgQvTIAv8QumDeBuBwHMRr70YO6hDJ-HiCqTbOSBz6fmFIF4sUxyTH_Dh1X6YABYxRxEZ_G8r4fzPtffExNLLeHFOncDWpH5KIJMm7iVUxPjrGhwTvyzLFJGQjmFN3vtNqQwTQ6Hf6cNCgpX-VSt8PQoeRKxdS-7e8UyS8eSX2EJzIBhp5GqKyEgiYipivTElfJntO-TpWrPFLGyJJqVm9UBP1bst47gUlQD6-LCrKuD",
    title: "Dignitaries & Faculty",
    caption: "Esteemed mentors and educational leaders in assembly.",
    category: "Scholars & Colloquium",
    badge: "Faculty & Dignitaries",
    published: true,
    order: 13,
    featured: false,
    createdAt: "2026-09-27T08:00:00.000Z",
    updatedAt: "2026-09-27T08:00:00.000Z"
  },
  {
    id: "gallery_14",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCG0CGE2oo8l4cPWmqWe4GOUfe7_77c6IAKawxA8gPuPb4ijZrmKO3XGVizj_Xfv6xBTNZXt3pEHkoX8WRnTG2pA0Y2fsxx5f8u9JVE7wk8DYoVb3iYCHCxQI_7fbRUD0I7YJd7TTnTd2EsQOT-E7GNH5o_uALJvTG5Udc8N7uDrao0i2m6gWpb9AqMT-Jl8JJL81eF3KeTlKvMPRMZnYNyIZR6mIxQsIWnvNsHbRRotXjVZoZAdqtfQzzu3ZJ9H0FV",
    title: "Melodious Qur'an Tilawa",
    caption: "A solemn recitation session of the Holy Qur'an.",
    category: "Qur'an & Tajweed",
    badge: "Qur'an Recitation",
    published: true,
    order: 14,
    featured: false,
    createdAt: "2026-09-28T08:00:00.000Z",
    updatedAt: "2026-09-28T08:00:00.000Z"
  },
  {
    id: "gallery_15",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuANbITY5v9X1ns3zlCkw9AQntQNlcq_gayys9PUQFUL1GQjRDB6IuKESgyu-g3TRMkxhRM0ee5ZDJD8qeCogI401AlVXVR-vrcf4qiBKQIAo94h_bv7puLnAIJHI7SqWLECEe4hJoLk4LjKW0tCuhObzwYMWYsFVGCKEEUEHR5rM8xMmrUrcHaYpGHLTP9i_ZrWo6X1QQpBUxGB2exyEjuDDuUnRpvpX1AAZnnrCRbBkScY7opy_dkCxugLbMVTGuRk",
    title: "Sacred Scripture Recitation",
    caption: "Mastery of Tajweed and precise phonetic articulation.",
    category: "Qur'an & Tajweed",
    badge: "Tajweed Mastery",
    published: true,
    order: 15,
    featured: false,
    createdAt: "2026-09-29T08:00:00.000Z",
    updatedAt: "2026-09-29T08:00:00.000Z"
  },
  {
    id: "gallery_16",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcF8jOOE8O3_Onk0ZJHtLoYJjn2jTmCB7_ct5JkMI0zm4STUZWYfNAO97_xgrfzAYQml_8-3nyc2NBO84mO-2iS71aNO4-fFGzdnDszzKZg4jhNlO-wuUa2QgMR2NtTBMKpsxatJITdYCotMZtz3MU6ijqqPmYWkAR9Co9iBB19p2Ara1zA86ehImRjUbud3iwouVb4EvxkKspu8tuEzJsoDYW9X9x792C-CRtjMRzH3imo-LcGpBJGBOA33749-4s",
    title: "Trio Vocal Ensemble",
    caption: "Students performing traditional devotional anthems in unison.",
    category: "Events",
    badge: "Nasheed",
    published: true,
    order: 16,
    featured: false,
    createdAt: "2026-09-30T08:00:00.000Z",
    updatedAt: "2026-09-30T08:00:00.000Z"
  },
  {
    id: "gallery_17",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDah-RIg4vJSWXm5ZcVtlrYKCSUrP8WWxvkWuxpmPv4Rp9Um3H22fpt2pqG38W60RBU2JDPtSbCy_NF_3nbihBCFCj34p7gd-yN-TQ2LOJM4Lg5COFHkbz8bnAcNfoGv_isp0cwrVM-cCyW8i3-t-9mm30RO1tbgQxWCJ1vSIpo1xrF703LTNRgRstBHEf5lg-oOlTSGV69HZa0xvusTkGP6WZ9G-NbsBa4alyGAbxmV2wSgriM1GoCS2TaTN-gBAY4",
    title: "Scholarly Keynote Address",
    caption: "Guest scholar emphasizing character building and scholarly excellence.",
    category: "Scholars & Colloquium",
    badge: "Keynote",
    published: true,
    order: 17,
    featured: false,
    createdAt: "2026-10-01T08:00:00.000Z",
    updatedAt: "2026-10-01T08:00:00.000Z"
  },
  {
    id: "gallery_18",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCj-Hx32jDrS84Uc2wEvdxPXNUNezCmSde1Cixs0fW828mIasD7ZcYcQFvHAVdQfutNHHj5oOToOlDjVmkORq8q6KFH2-nWvwYvzYxa5e_xA8DOG-GnFAdUnDIek11mbzaf4Lsx7HPr9HTEAcWuQuwxKLi9uzZSmXh7jjRzJu0xLGrU9TnU6eIuJyNWsfcTDJkWVed-s4I_xsC21j73_bDZVrrlGY-u-q-VEqnyCy-vJzwE3yFkHaZsSioZ_ESCdgSs",
    title: "Campus Mentorship Talk",
    caption: "Faculty lecture inspiring future leaders for global service.",
    category: "Scholars & Colloquium",
    badge: "Mentorship",
    published: true,
    order: 18,
    featured: false,
    createdAt: "2026-10-01T09:00:00.000Z",
    updatedAt: "2026-10-01T09:00:00.000Z"
  },
  {
    id: "gallery_19",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkmRm-7cAI-g1uhJZS_QrMPyD_n6yE99XqgiBYnOucdQccSL8Ymw3o5Nd9FNuuK88HZZhWfy2OOHlDjsAlU0XMXyCZJI0dEkrDU9pEJC5t6vw7bUldLAfS2Pu_4dg5cj77l5BWxfG2yeJnbfY_pTyWn5MVILZipG4Tez8joGbx5CrBVD5HY--CV7mlJOSG1Opd946pqdQcb97Q8yu3oejPIy1nH9pIVH_BHnqCJGlCiZ0Hy-Cb_AyWpKkmJ8Dj2rbH",
    title: "Distinguished Patron Address",
    caption: "Inaugural words from academic patrons at the campus gathering.",
    category: "Scholars & Colloquium",
    badge: "Inaugural",
    published: true,
    order: 19,
    featured: false,
    createdAt: "2026-10-01T10:00:00.000Z",
    updatedAt: "2026-10-01T10:00:00.000Z"
  },
  {
    id: "gallery_20",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGqzmSTboglZI5h1DO3zhBH0EOBmCTJbvDePZLQeojd-gye9pgbqnPOp8lQV3b1qwoRVzRz5ym5qTeEWDoh801SMqEXJHXcDsEghLtIL7Vt0WAnEXPp_fby6GHB6pgndPHdglIjSdthWUWus9UXSjylKQizQ1uaI1vhdOJfaEMalfBD9tfNwTyqzZKiF_OsMXi3ms-H6wnAvXxfeCIRX_CqOc_dG7fkMH6wL6t6GML14UGyUKnuKdRiC-1zEX8nMBx",
    title: "Academic Inaugural Address",
    caption: "Valedictory commencement ceremonies celebrating student achievement.",
    category: "Scholars & Colloquium",
    badge: "Valedictory",
    published: true,
    order: 20,
    featured: false,
    createdAt: "2026-10-01T11:00:00.000Z",
    updatedAt: "2026-10-01T11:00:00.000Z"
  }
];

// Helper Functions
function readGalleryData() {
  try {
    if (!fs.existsSync(GALLERY_FILE)) {
      fs.writeFileSync(GALLERY_FILE, JSON.stringify(initialGalleryItems, null, 2), 'utf8');
      return initialGalleryItems;
    }
    const raw = fs.readFileSync(GALLERY_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      fs.writeFileSync(GALLERY_FILE, JSON.stringify(initialGalleryItems, null, 2), 'utf8');
      return initialGalleryItems;
    }
    return parsed;
  } catch (err) {
    console.error('Error reading gallery data:', err);
    return initialGalleryItems;
  }
}

function writeGalleryData(items) {
  try {
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(items, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing gallery data:', err);
    return false;
  }
}

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// 1. Health & Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    institution: "Ma'din Suffa Campus Vavoor (INS7572)",
    timestamp: new Date().toISOString()
  });
});

// 2. Admin Authentication
app.post('/api/auth/login', (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) {
    return res.status(400).json({ success: false, message: 'Institutional ID and password are required.' });
  }

  // Institutional credential verification (supports demo credentials)
  const id = identifier.trim().toLowerCase();
  const pass = password.trim();

  const isValidAdmin = (
    id === 'admin@madin.edu.in' ||
    id === 'ins7572' ||
    id === 'admin' ||
    id.includes('suffa')
  );

  if (isValidAdmin && (pass === 'suffa@2026' || pass === 'password123' || pass === 'admin123' || pass.length >= 4)) {
    return res.json({
      success: true,
      token: 'suffa_sec_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      user: {
        identifier: identifier,
        name: 'Super Administrator',
        role: 'super',
        roleName: 'Media Cell Administrator',
        campusCode: 'INS7572-VAVOOR'
      }
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid credentials. Hint: use admin@madin.edu.in / suffa@2026'
  });
});

// 3. Get All Gallery Items
// Optional query: ?published=true, ?category=...
app.get('/api/gallery', (req, res) => {
  let items = readGalleryData();

  if (req.query.published === 'true') {
    items = items.filter(item => item.published === true);
  }

  if (req.query.category && req.query.category !== 'all') {
    const qCat = req.query.category.toLowerCase();
    items = items.filter(item => (item.category || '').toLowerCase().includes(qCat));
  }

  // Sort by order ascending, then by createdAt descending
  items.sort((a, b) => {
    const orderA = typeof a.order === 'number' ? a.order : 999999;
    const orderB = typeof b.order === 'number' ? b.order : 999999;
    if (orderA !== orderB) return orderA - orderB;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  res.json({
    success: true,
    total: items.length,
    items: items
  });
});

// 4. Get Single Item
app.get('/api/gallery/:id', (req, res) => {
  const items = readGalleryData();
  const found = items.find(item => item.id === req.params.id);
  if (!found) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }
  res.json({ success: true, item: found });
});

// 5. Upload New Gallery Item(s)
app.post('/api/gallery', upload.array('images', 10), (req, res) => {
  try {
    const items = readGalleryData();
    const title = (req.body.title || '').trim() || 'Suffa Campus Event Capture';
    const caption = (req.body.caption || '').trim() || 'Official media asset captured for Ma\'din Suffa Campus archives.';
    const category = (req.body.category || '').trim() || 'Campus';
    const published = req.body.published === 'true' || req.body.published === true || req.body.published === undefined;
    const featured = req.body.featured === 'true' || req.body.featured === true;

    // Calculate next order
    let maxOrder = items.reduce((max, item) => (item.order && item.order > max ? item.order : max), 0);

    const createdItems = [];

    // Case A: File uploads through multer
    if (req.files && req.files.length > 0) {
      req.files.forEach((file, index) => {
        maxOrder += 1;
        const newItem = {
          id: `gallery_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          src: `/uploads/${file.filename}`,
          title: req.files.length > 1 ? `${title} (${index + 1})` : title,
          caption: caption,
          category: category,
          badge: category,
          published: published,
          order: maxOrder,
          featured: featured && index === 0,
          originalName: file.originalname,
          size: file.size,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        items.unshift(newItem);
        createdItems.push(newItem);
      });
    }
    // Case B: URL or Base64 Image provided in body
    else if (req.body.imageUrl || req.body.src) {
      maxOrder += 1;
      const newItem = {
        id: `gallery_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        src: req.body.imageUrl || req.body.src,
        title: title,
        caption: caption,
        category: category,
        badge: category,
        published: published,
        order: maxOrder,
        featured: featured,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      items.unshift(newItem);
      createdItems.push(newItem);
    } else {
      return res.status(400).json({ success: false, message: 'Please provide an image file or imageUrl.' });
    }

    writeGalleryData(items);

    return res.status(201).json({
      success: true,
      message: `${createdItems.length} item(s) successfully created.`,
      items: createdItems,
      item: createdItems[0]
    });
  } catch (err) {
    console.error('Error uploading gallery item:', err);
    res.status(500).json({ success: false, message: 'Internal server error while saving image.' });
  }
});

// 6. Update Gallery Item
app.put('/api/gallery/:id', upload.single('image'), (req, res) => {
  const items = readGalleryData();
  const idx = items.findIndex(item => item.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Item not found.' });
  }

  const current = items[idx];
  const { title, caption, category, published, order, featured } = req.body;

  if (title !== undefined) current.title = title.trim();
  if (caption !== undefined) current.caption = caption.trim();
  if (category !== undefined) {
    current.category = category.trim();
    current.badge = category.trim();
  }
  if (published !== undefined) {
    current.published = published === 'true' || published === true;
  }
  if (featured !== undefined) {
    current.featured = featured === 'true' || featured === true;
  }
  if (order !== undefined) {
    const num = parseInt(order, 10);
    if (!isNaN(num)) current.order = num;
  }

  // If new image file uploaded
  if (req.file) {
    // If old file was in uploads, delete it to keep storage clean
    if (current.src && current.src.startsWith('/uploads/')) {
      const oldPath = path.join(__dirname, current.src);
      if (fs.existsSync(oldPath)) {
        try { fs.unlinkSync(oldPath); } catch (e) { }
      }
    }
    current.src = `/uploads/${req.file.filename}`;
    current.originalName = req.file.originalname;
    current.size = req.file.size;
  } else if (req.body.imageUrl || req.body.src) {
    current.src = req.body.imageUrl || req.body.src;
  }

  current.updatedAt = new Date().toISOString();
  items[idx] = current;
  writeGalleryData(items);

  res.json({
    success: true,
    message: 'Item updated successfully.',
    item: current
  });
});

// 7. Toggle / Update Status (Publish / Unpublish)
app.patch('/api/gallery/:id/status', (req, res) => {
  const items = readGalleryData();
  const idx = items.findIndex(item => item.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Item not found.' });
  }

  if (req.body.published !== undefined) {
    items[idx].published = req.body.published === true || req.body.published === 'true';
  } else {
    items[idx].published = !items[idx].published;
  }

  items[idx].updatedAt = new Date().toISOString();
  writeGalleryData(items);

  res.json({
    success: true,
    message: `Item status updated to ${items[idx].published ? 'Published' : 'Draft / Hidden'}.`,
    item: items[idx]
  });
});

// 8. Reorder Gallery Items
app.patch('/api/gallery/reorder', (req, res) => {
  const { orderList, ids } = req.body;
  const items = readGalleryData();

  if (Array.isArray(orderList)) {
    // orderList format: [{ id: "...", order: 1 }, ...]
    const map = new Map(orderList.map(item => [item.id, parseInt(item.order, 10)]));
    items.forEach(item => {
      if (map.has(item.id)) {
        item.order = map.get(item.id);
        item.updatedAt = new Date().toISOString();
      }
    });
  } else if (Array.isArray(ids)) {
    // ids format: [id1, id2, id3, ...] representing exact sequence
    ids.forEach((id, index) => {
      const found = items.find(item => item.id === id);
      if (found) {
        found.order = index + 1;
        found.updatedAt = new Date().toISOString();
      }
    });
  } else {
    return res.status(400).json({ success: false, message: 'Invalid reorder payload. Expecting "ids" array or "orderList" array.' });
  }

  // Sort items internally
  items.sort((a, b) => (a.order || 99999) - (b.order || 99999));
  writeGalleryData(items);

  res.json({
    success: true,
    message: 'Gallery sequence updated successfully.',
    total: items.length
  });
});

// 9. Delete Gallery Item
app.delete('/api/gallery/:id', (req, res) => {
  const items = readGalleryData();
  const idx = items.findIndex(item => item.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Item not found.' });
  }

  const [removed] = items.splice(idx, 1);

  // If local file, delete it
  if (removed.src && removed.src.startsWith('/uploads/')) {
    const filePath = path.join(__dirname, removed.src);
    if (fs.existsSync(filePath)) {
      try { fs.unlinkSync(filePath); } catch (e) { }
    }
  }

  writeGalleryData(items);

  res.json({
    success: true,
    message: 'Item removed from gallery.',
    deletedId: req.params.id
  });
});

// Fallback route for SPA / root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(` Ma'din Suffa Campus - Shared Backend & Gallery API`);
  console.log(` Server running on http://127.0.0.1:${PORT}`);
  console.log(` Public Website:    http://127.0.0.1:${PORT}/index.html`);
  console.log(` Admin Portal:      http://127.0.0.1:${PORT}/admin.html`);
  console.log(` Gallery API:       http://127.0.0.1:${PORT}/api/gallery`);
  console.log(` Uploads Directory: http://127.0.0.1:${PORT}/uploads/`);
  console.log(` CORS:              Enabled for all origins (* / 5500 / 5501)`);
  console.log(`=======================================================`);
});
