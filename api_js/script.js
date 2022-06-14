// 게시물 리스트
function fetchData() {
  let url = 'https://jsonplaceholder.typicode.com/posts';
  return fetch(url).then(response => {
    return response.json();
  });
};

// 선택한 게시물 데이터
function fetchDetailData(p) {
  let url = `https://jsonplaceholder.typicode.com/posts/${p}`;
  return fetch(url).then(response => {
    return response.json();
  });
};

// 선택한 게시물 댓글 데이터
function fetchDetailCommentData(p) {
  let url = `https://jsonplaceholder.typicode.com/comments?postId=${p}`;
  return fetch(url).then(response => {
    return response.json();
  });
};

// 페이지 값
let pageNum = 0;

// 페이지 이동 함수
function pageMove(el) {
  const val = Number(el.dataset.id);
  pageNum = val * 10;
  test();
}


// 전체 게시물 구현 함수
async function test() {
  let data = await fetchData();
  let dataLeng = data.length;
  
  const box = document.querySelector('.cont');
  const pagenation = document.querySelector('.pagenation');
  const header = `
    <li class="data_list list_header">
      <div class="list_td">
        <span>글번호</span>
      </div>
      <div class="list_td">
        <span>제목</span>
      </div>
      <div class="list_td">
        <span>글쓴이</span>
      </div>
    </li>
  `;

  box.innerHTML = header;
  pagenation.innerHTML = '';
  let n = pageNum ? pageNum / 10 : 0;
  
  for(let i = 0; i < (dataLeng / 10); i++) {
    pagenation.innerHTML += `
    <li class="page${i === n ? ' active' : ''}" onclick="pageMove(this)" data-id="${i}">
    <span>${i + 1}</span>
    </li>
    `;
  };

  for(let j = pageNum; j < pageNum + 10; j++) {
    const {id, title, userId} = data[j];

    box.innerHTML += `
      <li class="data_list" onclick="location.href='/api_js/detail.html?${id}'">
        <div class="list_td">
          <span>${id}</span>
        </div>
        <div class="list_td">
          <span>${title}</span>
        </div>
        <div class="list_td">
          <span>${userId}</span>
        </div>
      </li>
    `
  };
};


// 선택한 게시물 내용 구현
async function detailDataFuc(v) {
  let data = await fetchDetailData(v);
  const {id, userId, title, body} = data;

  const _title = document.querySelector('.title');
  const writer = document.querySelector('.writer');
  const cont = document.querySelector('.content_val');
  const idEl = document.querySelector('.id_num');

  _title.innerText = title;
  writer.innerText = `글쓴이 : ${userId}`;
  cont.innerText = body;
  idEl.innerText = `글번호 : ${id}`;
};


// 선택한 게시물의 댓글 구현
async function detailCommentsFuc(v) {
  let data = await fetchDetailCommentData(v);
  let total = data.length;

  const totalEl = document.querySelector('.total_comments');
  const commentBox = document.querySelector('.comment_wrap');

  totalEl.innerText = total ? `댓글 ${total}개` : '댓글 0개';
  commentBox.innerHTML = '';

  for(let i = 0; i < total; i++) {
    const {name, email, body} = data[i];

    commentBox.innerHTML += `
      <li class="commet_list">
        <div class="commet_header">
          <span class="user_name">${name}</span>
          <span class="user_email">${email}</span>
        </div>
        <div class="comment_cont">
          <p class="comment_val">
            ${body}
          </p>
        </div>
      </li>
    `;
  };
};



document.addEventListener('DOMContentLoaded', () => {
  let thisfilefullname = document.URL.substring(document.URL.lastIndexOf('/') + 1, document.URL.length);
  let thisfilename = thisfilefullname.substring(thisfilefullname.lastIndexOf('.'), 0);
  console.log(thisfilefullname);

  if(thisfilename === 'index') {
    test();
  } else if(thisfilename === 'detail') {
    let p = thisfilefullname.split('?')[1];
    detailDataFuc(p);
    detailCommentsFuc(p);
  };
});










