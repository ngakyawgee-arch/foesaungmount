let cache = {};

function showMonthly(){
  content.innerHTML = `
  <div class="card">
    <input id="donor" placeholder="အလှူရှင်အမည်">
    <input id="address" placeholder="နေရပ်">
    <input id="amount" type="number" placeholder="အလှူငွေ">
    <input id="note" placeholder="မှတ်ချက်">
    <input id="month" type="month">
    <button onclick="saveMonthly()">သိမ်းမည်</button>
  </div>

  <div id="printArea" class="card">
    <table width="100%">
      <thead>
        <tr>
          <th>No</th>
          <th>အမည်</th>
          <th>နေရပ်</th>
          <th>ငွေ</th>
          <th>မှတ်ချက်</th>
        </tr>
      </thead>
      <tbody id="monthlyBody"></tbody>
    </table>
  </div>

  <button onclick="exportPNG()">PNG Export</button>
  `;
  loadMonthly();
}

function saveMonthly(){
  db.ref("monthly").push({
    donor: donor.value,
    address: address.value,
    amount:+amount.value,
    note:note.value,
    month:month.value,
    time:Date.now()
  });
}

function loadMonthly(){
  db.ref("monthly").on("value",snap=>{
    let i=1,html="";
    snap.forEach(s=>{
      let v=s.val();
      html+=`
      <tr>
        <td>${i++}</td>
        <td>${v.donor}</td>
        <td>${v.address}</td>
        <td>${v.amount}</td>
        <td>${v.note||"-"}</td>
      </tr>`;
    });
    monthlyBody.innerHTML = html;
  });
}