const $=s=>document.querySelector(s);const $$=s=>document.querySelectorAll(s);
const state={business:JSON.parse(localStorage.getItem("mp_business")||"null"),plan:JSON.parse(localStorage.getItem("mp_plan")||"null")};
function save(){localStorage.setItem("mp_business",JSON.stringify(state.business));localStorage.setItem("mp_plan",JSON.stringify(state.plan))}
function toast(t){const x=$("#toast");x.textContent=t;x.className="show";setTimeout(()=>x.className="",2200)}
function go(page){$$(".page").forEach(x=>x.classList.toggle("active",x.id===page));$$(".nav").forEach(x=>x.classList.toggle("active",x.dataset.page===page));$("#pageTitle").textContent=page[0].toUpperCase()+page.slice(1)}
$$(".nav").forEach(b=>b.onclick=()=>go(b.dataset.page));$$("[data-goto]").forEach(b=>b.onclick=()=>go(b.dataset.goto));$("#mobileMenu").onclick=()=>$(".sidebar").classList.toggle("open");

function profile(){
 if(!state.business)return;
 $("#welcome").textContent=`Grow ${state.business.name} with AI.`;
 $("#businessSummary").textContent=`${state.business.category||"Business"} · ${state.business.location||"Your market"} · Target: ${state.business.audience||"your customers"}`;
 $("#name").value=state.business.name||"";$("#category").value=state.business.category||"";$("#location").value=state.business.location||"";
 $("#audience").value=state.business.audience||"";$("#services").value=state.business.services||"";$("#budget").value=state.business.budget||"";
 $("#website").value=state.business.website||"";$("#social").value=state.business.social||"";
}
$("#businessForm").onsubmit=e=>{e.preventDefault();state.business={name:$("#name").value,category:$("#category").value,location:$("#location").value,audience:$("#audience").value,services:$("#services").value,budget:$("#budget").value,website:$("#website").value,social:$("#social").value};save();profile();$("#saveMsg").textContent="Saved ✓";toast("Business profile saved")};

function demoPlan(){
 const b=state.business||{name:"your business",category:"business",location:"your market",audience:"your target customers",services:"your products/services"};
 return {
 score:82,
 recommendations:[
 `Create 3 short-form videos this week focused on ${b.services}.`,
 `Use local keywords around ${b.location||"your location"} in website and social content.`,
 `Create one clear offer for ${b.audience||"your target customers"}.`,
 "Repurpose the best-performing post into a Reel, Story and ad variation."
 ],
 focus:["Week 1: Positioning + audience research","Week 2: Content + local SEO","Week 3: Lead campaign + offer","Week 4: Measure results + optimize"],
 posts:[
 ["Educational","3 things customers should know before choosing a "+b.category],
 ["Problem/Solution","Having trouble with "+b.services+"? Here is a simple solution."],
 ["Offer","A limited-time offer designed for "+(b.audience||"local customers")],
 ["Behind the scenes","Show how your business delivers its product/service."],
 ["Social proof","Share a customer result, review or success story."]
 ],
 keywords:[b.category+" in "+(b.location||"your city"),"best "+b.category+" near me",b.services+" "+(b.location||"local"),"affordable "+b.category],
 campaigns:[
 ["Lead Generation","Local customers","Create a lead-focused offer with a clear WhatsApp/call CTA."],
 ["Awareness","Local reach","Short video ads introducing the business and its strongest benefit."],
 ["Retargeting","Website visitors","Show proof, offer and CTA to people who already visited."]
 ]};
}
function renderPlan(){const p=state.plan;if(!p)return;$("#score").textContent=p.score+"/100";$("#ideas").textContent=p.posts.length;$("#seoCount").textContent=p.keywords.length;$("#campaigns").textContent=p.campaigns.length;
 $("#recommendations").innerHTML=p.recommendations.map(x=>`<div>✓ ${x}</div>`).join("");$("#focus").innerHTML=p.focus.map((x,i)=>`<div><b>${i+1}.</b> ${x}</div>`).join("")}
function generate(){if(!state.business){go("business");toast("Save your business profile first");return}state.plan=demoPlan();save();renderPlan();toast("AI marketing plan generated");go("dashboard")}
$("#quickPlan").onclick=generate;
$("#genContent").onclick=()=>{if(!state.business){go("business");return}const p=state.plan||demoPlan();$("#contentOutput").innerHTML=p.posts.map((x,i)=>`<article class="content-card"><span class="tag">${x[0]}</span><h3>${x[1]}</h3><p>Hook: “${x[1]}”</p><p class="muted">CTA: Learn more, message us, or visit our website.</p><button class="primary copy" data-text="${x[1]}">Copy idea</button></article>`).join("");$$(".copy").forEach(b=>b.onclick=()=>{navigator.clipboard?.writeText(b.dataset.text);toast("Idea copied")});go("content")};
$("#genSEO").onclick=()=>{if(!state.business){go("business");return}const p=state.plan||demoPlan();$("#seoOutput").innerHTML=`<div class="card"><h3>Keyword opportunities</h3>${p.keywords.map(x=>`<div class="output-item">${x}</div>`).join("")}</div><div class="card"><h3>On-page actions</h3><div class="output-item">Improve page title and meta description</div><div class="output-item">Create a local landing page</div><div class="output-item">Add FAQs answering customer objections</div><div class="output-item">Publish 2–3 useful articles around buyer questions</div></div>`;go("seo")};
$("#genAds").onclick=()=>{if(!state.business){go("business");return}const p=state.plan||demoPlan();$("#adsOutput").innerHTML=p.campaigns.map(x=>`<div class="card"><span class="tag">${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p><div class="output-item"><b>Next:</b> create 2 creatives, test 2 hooks, define one conversion action.</div></div>`).join("");go("ads")};
profile();if(!state.plan){state.plan=demoPlan();save()}renderPlan();