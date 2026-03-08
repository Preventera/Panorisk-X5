import { useState, useMemo, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Line } from "recharts";

const D={"yr":{"2018":{"t":103406,"tms":28225,"psy":3595,"mac":3408,"sur":10608,"cov":0},"2019":{"t":107465,"tms":28738,"psy":3897,"mac":3622,"sur":11712,"cov":0},"2020":{"t":104732,"tms":25552,"psy":3889,"mac":3922,"sur":9024,"cov":16614},"2021":{"t":105692,"tms":28466,"psy":4401,"mac":3914,"sur":11826,"cov":10742},"2022":{"t":161962,"tms":26814,"psy":4190,"mac":3930,"sur":11350,"cov":67202},"2023":{"t":114345,"tms":26624,"psy":5532,"mac":4605,"sur":9789,"cov":18662},"2024":{"t":107124,"tms":25133,"psy":5057,"mac":4518,"sur":9827,"cov":4457}},"mx":{"2018":{"Santé & Social":18154,"Autres/Non codés":13131,"Fab. Biens Durables":11095,"Fab. Biens Non Dur.":8400,"Commerce Détail":7783,"Construction":7443,"Transport":5912,"Admin. Publiques":4978,"Enseignement":4429,"Serv. Entreprises":4410,"Héberg. & Resto":4190,"Commerce Gros":3686,"Autres Services":3296},"2019":{"Santé & Social":18009,"Autres/Non codés":14703,"Fab. Biens Durables":11289,"Fab. Biens Non Dur.":8579,"Construction":8234,"Commerce Détail":8120,"Transport":6246,"Admin. Publiques":5111,"Enseignement":4952,"Serv. Entreprises":4910,"Héberg. & Resto":4261,"Commerce Gros":3682,"Autres Services":3079},"2020":{"Santé & Social":31652,"Autres/Non codés":11979,"Fab. Biens Durables":8925,"Fab. Biens Non Dur.":7994,"Construction":7599,"Commerce Détail":7230,"Transport":5115,"Admin. Publiques":4393,"Serv. Entreprises":4136,"Enseignement":3640,"Commerce Gros":3045,"Héberg. & Resto":2355,"Autres Services":2333},"2021":{"Santé & Social":26589,"Autres/Non codés":14761,"Fab. Biens Durables":9778,"Construction":8826,"Fab. Biens Non Dur.":7873,"Commerce Détail":7325,"Transport":5087,"Enseignement":4626,"Admin. Publiques":4495,"Serv. Entreprises":4335,"Commerce Gros":3054,"Héberg. & Resto":2170,"Autres Services":2365},"2022":{"Santé & Social":74517,"Autres/Non codés":15906,"Fab. Biens Durables":10297,"Construction":9502,"Fab. Biens Non Dur.":7883,"Commerce Détail":7216,"Transport":6193,"Admin. Publiques":5728,"Enseignement":5625,"Serv. Entreprises":5565,"Commerce Gros":3144,"Héberg. & Resto":2822,"Autres Services":2546},"2023":{"Santé & Social":34944,"Fab. Biens Durables":10547,"Construction":9590,"Autres/Non codés":8899,"Fab. Biens Non Dur.":7540,"Commerce Détail":7266,"Enseignement":5803,"Transport":5739,"Admin. Publiques":5155,"Serv. Entreprises":4545,"Commerce Gros":3252,"Héberg. & Resto":3052,"Autres Services":2779},"2024":{"Santé & Social":27361,"Fab. Biens Durables":10034,"Construction":9712,"Autres/Non codés":9012,"Fab. Biens Non Dur.":7636,"Commerce Détail":7358,"Enseignement":5877,"Transport":5812,"Admin. Publiques":5221,"Serv. Entreprises":4603,"Commerce Gros":3293,"Héberg. & Resto":3091,"Autres Services":2814}},"rg":[{"c":"01","n":"Bas-Saint-Laurent","s":"BSL","lat":48.0,"lon":-68.0,"p":17.1},{"c":"02","n":"Saguenay–Lac-St-Jean","s":"SLSJ","lat":48.5,"lon":-71.5,"p":21.0},{"c":"03","n":"Capitale-Nationale","s":"CN","lat":47.0,"lon":-71.3,"p":14.7},{"c":"04","n":"Mauricie","s":"MAU","lat":46.8,"lon":-72.7,"p":16.6},{"c":"05","n":"Estrie","s":"EST","lat":45.5,"lon":-71.8,"p":15.2},{"c":"06","n":"Montréal","s":"MTL","lat":45.5,"lon":-73.6,"p":10.9},{"c":"07","n":"Outaouais","s":"OUT","lat":46.0,"lon":-76.0,"p":9.3},{"c":"08","n":"Abitibi-Témisc.","s":"AT","lat":48.5,"lon":-78.5,"p":20.5},{"c":"09","n":"Côte-Nord","s":"CN9","lat":50.0,"lon":-65.0,"p":18.5},{"c":"10","n":"Nord-du-Québec","s":"NQ","lat":53.0,"lon":-75.0,"p":18.6},{"c":"11","n":"Gaspésie–Î.M.","s":"GIM","lat":48.8,"lon":-65.5,"p":15.3},{"c":"12","n":"Chaudière-Appal.","s":"CA","lat":46.5,"lon":-70.8,"p":18.6},{"c":"13","n":"Laval","s":"LAV","lat":45.6,"lon":-73.7,"p":14.7},{"c":"14","n":"Lanaudière","s":"LAN","lat":46.2,"lon":-73.5,"p":20.5},{"c":"15","n":"Laurentides","s":"LAU","lat":46.3,"lon":-74.5,"p":15.6},{"c":"16","n":"Montérégie","s":"MTG","lat":45.4,"lon":-73.0,"p":16.2},{"c":"17","n":"Centre-du-Québec","s":"CDQ","lat":46.1,"lon":-72.0,"p":18.1}],"rm":{"2018":{"01":2815,"02":4909,"03":9369,"04":3741,"05":4137,"06":17330,"07":3057,"08":2546,"09":1384,"10":647,"11":1071,"12":6760,"13":5110,"14":8645,"15":7950,"16":20238,"17":3697},"2019":{"01":2926,"02":5102,"03":9737,"04":3888,"05":4299,"06":18010,"07":3177,"08":2646,"09":1438,"10":673,"11":1114,"12":7025,"13":5311,"14":8984,"15":8262,"16":21031,"17":3842},"2020":{"01":2803,"02":4699,"03":9606,"04":3651,"05":4118,"06":18285,"07":3043,"08":2413,"09":1324,"10":644,"11":1067,"12":6533,"13":5214,"14":8778,"15":8032,"16":20949,"17":3573},"2021":{"01":2856,"02":4788,"03":9675,"04":3721,"05":4196,"06":18212,"07":3101,"08":2459,"09":1350,"10":657,"11":1087,"12":6657,"13":5262,"14":8875,"15":8136,"16":21019,"17":3641},"2022":{"01":4618,"02":7742,"03":16288,"04":6016,"05":6784,"06":24552,"07":5013,"08":3977,"09":2423,"10":1062,"11":1420,"12":10764,"13":8801,"14":14746,"15":13429,"16":28441,"17":5886},"2023":{"01":3075,"02":5155,"03":10477,"04":4006,"05":4517,"06":19834,"07":3338,"08":2648,"09":1453,"10":707,"11":1170,"12":7167,"13":5693,"14":9592,"15":8786,"16":22807,"17":3920},"2024":{"01":2908,"02":4876,"03":9677,"04":3789,"05":4273,"06":18387,"07":3158,"08":2505,"09":1407,"10":669,"11":1130,"12":6779,"13":5279,"14":8930,"15":8212,"16":21438,"17":3707}}};

// ── DIMENSION DATA (yearly × dimension × value) for filters ──
const YD={"nature":{"2018":{"Trauma musculaire":38617,"Plaie/contusion":11595,"Mal. nerveuses":9134,"Troubles musc-squel":8002,"Trauma os/nerfs":6740,"Plaie ouverte":6516},"2019":{"Trauma musculaire":40832,"Plaie/contusion":11508,"Mal. nerveuses":9708,"Troubles musc-squel":8639,"Trauma os/nerfs":7544,"Plaie ouverte":6335},"2020":{"Trauma musculaire":34624,"Mal. respiratoires":9220,"Mal. nerveuses":8810,"Plaie/contusion":8534,"Troubles musc-squel":8087,"Trauma os/nerfs":6637},"2021":{"Trauma musculaire":38470,"Mal. nerveuses":11658,"Plaie/contusion":8666,"Troubles musc-squel":8021,"Trauma os/nerfs":8013,"Mal. respiratoires":7218},"2022":{"Symptômes mal définis":49435,"Trauma musculaire":37351,"Mal. respiratoires":18086,"Mal. nerveuses":12049,"Plaie/contusion":9783,"Trauma os/nerfs":8794},"2023":{"Trauma musculaire":35188,"Symptômes mal définis":14670,"Plaie/contusion":11415,"Mal. nerveuses":10040,"Troubles musc-squel":8487,"Trauma os/nerfs":7690},"2024":{"Trauma musculaire":33000,"Plaie/contusion":10800,"Mal. nerveuses":9500,"Troubles musc-squel":8200,"Trauma os/nerfs":7300,"Symptômes mal définis":5500}},"genre":{"2018":{"Effort excessif":17661,"Réaction du corps":13648,"Chute même niveau":9954,"Frappé par objet":8893,"Exposition bruit":8140,"Heurter objet":5592},"2019":{"Effort excessif":16901,"Réaction du corps":14430,"Chute même niveau":11706,"Frappé par objet":9475,"Exposition bruit":8509,"Heurter objet":6278},"2020":{"Exposition substances":18329,"Effort excessif":16772,"Réaction du corps":10211,"Chute même niveau":9525,"Exposition bruit":7855,"Frappé par objet":7611},"2021":{"Effort excessif":17772,"Réaction du corps":13535,"Exposition substances":12120,"Exposition bruit":10934,"Frappé par objet":9910,"Chute même niveau":8027},"2022":{"Exposition substances":69164,"Effort excessif":16990,"Réaction du corps":13808,"Exposition bruit":11323,"Chute même niveau":11054,"Frappé par objet":10593},"2023":{"Exposition substances":21002,"Effort excessif":19431,"Réaction du corps":12507,"Chute même niveau":11382,"Frappé par objet":9891,"Exposition bruit":9289},"2024":{"Effort excessif":18500,"Réaction du corps":12000,"Chute même niveau":10800,"Frappé par objet":9500,"Exposition bruit":9200,"Exposition substances":8500}},"sexe":{"2018":{"HOMME":66999,"FEMME":36407},"2019":{"HOMME":69423,"FEMME":38042},"2020":{"HOMME":59741,"FEMME":44991},"2021":{"HOMME":63790,"FEMME":41902},"2022":{"HOMME":77160,"FEMME":84802},"2023":{"HOMME":62917,"FEMME":51428},"2024":{"HOMME":60000,"FEMME":47124}},"age":{"2018":{"45-54":22875,"35-44":21683,"55-64":20313,"25-34":19811,"20-24":8471,"65+":7401,"<20":2852},"2019":{"45-54":23343,"35-44":22688,"55-64":21207,"25-34":20151,"65+":8532,"20-24":8442,"<20":3102},"2020":{"45-54":23238,"35-44":22878,"55-64":20133,"25-34":20467,"20-24":8293,"65+":6848,"<20":2875},"2021":{"45-54":22270,"35-44":22223,"55-64":20937,"25-34":20388,"65+":8393,"20-24":8283,"<20":3198},"2022":{"35-44":36683,"45-54":35194,"25-34":34095,"55-64":29431,"20-24":12924,"65+":9714,"<20":3921},"2023":{"45-54":24856,"35-44":24840,"25-34":22652,"55-64":22071,"65+":8954,"20-24":8213,"<20":2759},"2024":{"45-54":23500,"35-44":23400,"25-34":21200,"55-64":21000,"65+":8500,"20-24":7800,"<20":2624}}};

const YRS=[2018,2019,2020,2021,2022,2023,2024];
const IND={t:{l:"Total",c:"#94a3b8"},tms:{l:"TMS",c:"#f59e0b"},psy:{l:"Psycho.",c:"#a78bfa"},mac:{l:"Machine",c:"#f97316"},sur:{l:"Surdité",c:"#06b6d4"},cov:{l:"COVID",c:"#ec4899"}};
const DIMS={nature:{l:"Nature",c:"#f59e0b",i:"🩹",v:["Trauma musculaire","Plaie/contusion","Mal. nerveuses","Troubles musc-squel","Trauma os/nerfs","Mal. respiratoires","Symptômes mal définis"]},genre:{l:"Genre",c:"#06b6d4",i:"⚡",v:["Effort excessif","Réaction du corps","Chute même niveau","Frappé par objet","Exposition substances","Exposition bruit","Heurter objet"]},sexe:{l:"Sexe",c:"#a78bfa",i:"👤",v:["HOMME","FEMME"]},age:{l:"Âge",c:"#34d399",i:"📊",v:["<20","20-24","25-34","35-44","45-54","55-64","65+"]}};
const fmt=n=>n>=1e6?(n/1e6).toFixed(1)+"M":n>=1e3?(n/1e3).toFixed(1)+"K":String(n);

const MW=460,MH=480;
const proj=(lon,lat)=>[((lon-(-80))/((-57)-(-80)))*MW,((62-lat)/(62-44.5))*MH];
const heat=(v,mx)=>{const t=Math.min(v/mx,1);return t<0.33?`rgba(96,165,250,${0.3+t*2})`:(t<0.66?`rgba(251,191,36,${0.4+t*0.6})`:`rgba(239,68,68,${0.5+t*0.5})`)};
const rClr=r=>r<14?"#22d3ee":r<18?"#60a5fa":r<22?"#f59e0b":r<26?"#f97316":"#ef4444";

export default function PanoriskX5() {
  const [year,setYear]=useState(2024);
  const [ind,setInd]=useState("t");
  const [view,setView]=useState("sec");
  const [selReg,setSelReg]=useState(null);
  const [hovReg,setHovReg]=useState(null);
  const [mapMode,setMapMode]=useState("vol");
  const [playing,setPlaying]=useState(false);
  const [filter,setFilter]=useState(null); // {dim:"nature",val:"Trauma musculaire"}
  const [openDrop,setOpenDrop]=useState(null);

  useEffect(()=>{
    if(!playing)return;
    const iv=setInterval(()=>setYear(y=>y>=2024?(setPlaying(false),2024):y+1),1400);
    return()=>clearInterval(iv);
  },[playing]);

  const yd=D.yr[String(year)];
  const prev=D.yr[String(year-1)];
  const yoy=prev?((yd.t-prev.t)/prev.t*100).toFixed(1):null;

  const secBars=useMemo(()=>{
    const mx=D.mx[String(year)]||{};
    return Object.entries(mx).sort((a,b)=>b[1]-a[1]).slice(0,13);
  },[year]);
  const maxSec=secBars[0]?.[1]||1;

  const rm=D.rm[String(year)];
  const maxReg=useMemo(()=>Math.max(...Object.values(rm)),[rm]);
  const totalReg=useMemo(()=>Object.values(rm).reduce((a,b)=>a+b,0),[rm]);

  const bubbles=useMemo(()=>D.rg.map(r=>{
    const val=rm[r.c]||0;
    const [x,y]=proj(r.lon,r.lat);
    const radius=mapMode==="vol"?Math.max(7,Math.sqrt(val/maxReg)*38):Math.max(7,(r.p/28)*32);
    const color=mapMode==="vol"?heat(val,maxReg):rClr(r.p);
    return{...r,x,y,val,radius,color};
  }),[rm,maxReg,mapMode]);

  const regDetail=useMemo(()=>{
    if(!selReg)return null;
    const r=D.rg.find(x=>x.c===selReg);
    if(!r)return null;
    return{...r,val:rm[selReg],timeline:YRS.map(y=>({y,val:D.rm[String(y)][selReg]}))};
  },[selReg,rm]);

  const crossData=useMemo(()=>{
    if(view!=="cross"||!selReg)return null;
    const mx=D.mx[String(year)]||{};
    const gTotal=yd.t;
    const rVal=rm[selReg];
    return Object.entries(mx).map(([s,v])=>({name:s,est:Math.round(v/gTotal*rVal)})).sort((a,b)=>b.est-a.est).slice(0,10);
  },[view,year,yd,selReg,rm]);

  const hasRight=(view==="map"&&selReg)||(view==="cross"&&selReg)||(view==="sec"&&filter);

  // Filter evolution timeline
  const filterEvo=useMemo(()=>{
    if(!filter)return null;
    const {dim,val}=filter;
    return YRS.map(y=>({y,count:YD[dim]?.[String(y)]?.[val]||0}));
  },[filter]);
  const bg="#050a14",card="#080e1a",brd="#111d35",txt="#c8d6e5",dm="#475569";

  return(
    <div style={{fontFamily:"'SF Mono',monospace",background:bg,color:txt,minHeight:"100vh",padding:12}} onClick={()=>setOpenDrop(null)}>
      <div style={{position:"fixed",inset:0,background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,136,0.005) 2px,rgba(0,255,136,0.005) 4px)",pointerEvents:"none",zIndex:999}}/>

      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8,borderBottom:`1px solid ${brd}`,paddingBottom:6}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:"#00ff88",boxShadow:"0 0 10px #00ff88"}}/>
          <span style={{fontSize:16,fontWeight:800,color:"#e2e8f0",letterSpacing:2}}>PANORISK-X5</span>
          <span style={{fontSize:8,color:"#334155"}}>v3.1 · ISQ 2024</span>
        </div>
        <span style={{fontSize:8,color:dm}}>804,726 lésions · 17 régions · 2018—2024</span>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:4,marginBottom:8}}>
        {[{k:"t",l:"TOTAL",i:"◉"},{k:"tms",l:"TMS",i:"⚡"},{k:"psy",l:"PSYCHO",i:"◈"},{k:"mac",l:"MACHINE",i:"⚙"},{k:"sur",l:"SURDITÉ",i:"◎"},{k:"cov",l:"COVID",i:"◆"}].map(({k,l,i})=>(
          <button key={k} onClick={()=>setInd(k)} style={{background:ind===k?`${IND[k].c}12`:card,border:`1px solid ${ind===k?IND[k].c:brd}`,borderRadius:5,padding:"5px 3px",cursor:"pointer",textAlign:"left",fontFamily:"inherit"}}>
            <div style={{fontSize:7,color:IND[k].c,letterSpacing:1.2}}>{i} {l}</div>
            <div style={{fontSize:14,fontWeight:700,color:ind===k?"#fff":"#94a3b8"}}>{fmt(yd[k])}</div>
            {k==="t"&&yoy&&<div style={{fontSize:7,color:Number(yoy)>0?"#dc2626":"#22c55e"}}>{Number(yoy)>0?"▲":"▼"} {Math.abs(yoy)}%</div>}
          </button>
        ))}
      </div>

      <div style={{display:"flex",gap:4,marginBottom:8,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{display:"flex",gap:1,background:card,borderRadius:5,padding:2,border:`1px solid ${brd}`}}>
          <button onClick={()=>setPlaying(!playing)} style={{background:"transparent",border:"none",color:playing?"#00ff88":dm,cursor:"pointer",padding:"3px 6px",fontSize:10}}>{playing?"⏸":"▶"}</button>
          {YRS.map(y=><button key={y} onClick={()=>{setPlaying(false);setYear(y)}} style={{background:y===year?"#1e3a5f":"transparent",border:"none",color:y===year?"#60a5fa":dm,padding:"3px 7px",borderRadius:3,cursor:"pointer",fontSize:10,fontWeight:y===year?700:400,fontFamily:"inherit"}}>{y}</button>)}
        </div>
        <div style={{display:"flex",gap:1,background:card,borderRadius:5,padding:2,border:`1px solid ${brd}`}}>
          {[{k:"sec",l:"📊 Secteurs"},{k:"map",l:"🗺️ Carte"},{k:"cross",l:"🔀 Croisement"}].map(({k,l})=>(
            <button key={k} onClick={()=>{setView(k);if(k==="sec")setSelReg(null);if(k!=="sec")setFilter(null)}} style={{background:view===k?"#1e3a5f":"transparent",border:"none",color:view===k?"#60a5fa":dm,padding:"3px 8px",borderRadius:3,cursor:"pointer",fontSize:9,fontFamily:"inherit"}}>{l}</button>
          ))}
        </div>
        {/* Dimension filters (sector view only) */}
        {view==="sec"&&Object.entries(DIMS).map(([dk,{l,c,i,v}])=>(
          <div key={dk} style={{position:"relative"}} onClick={e=>e.stopPropagation()}>
            <button onClick={()=>setOpenDrop(openDrop===dk?null:dk)} style={{background:filter?.dim===dk?`${c}20`:card,border:`1px solid ${filter?.dim===dk?c:brd}`,borderRadius:5,padding:"3px 7px",cursor:"pointer",fontSize:8,color:filter?.dim===dk?c:dm,fontFamily:"inherit",display:"flex",alignItems:"center",gap:3,maxWidth:130,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
              <span style={{opacity:0.7}}>{i}</span>{filter?.dim===dk?filter.val:l}<span style={{opacity:0.4,marginLeft:2,fontSize:7}}>{openDrop===dk?"▲":"▼"}</span>
              {filter?.dim===dk&&<span onClick={e=>{e.stopPropagation();setFilter(null);setOpenDrop(null)}} style={{marginLeft:3,cursor:"pointer"}}>✕</span>}
            </button>
            {openDrop===dk&&<div style={{position:"absolute",top:"100%",left:0,marginTop:3,background:"#0d1a2d",border:"1px solid #1e3a5f",borderRadius:5,zIndex:100,minWidth:160,maxHeight:220,overflowY:"auto",boxShadow:"0 8px 24px rgba(0,0,0,0.6)"}}>
              {v.map(val=><button key={val} onClick={()=>{setFilter({dim:dk,val});setOpenDrop(null)}} style={{display:"block",width:"100%",textAlign:"left",padding:"4px 10px",border:"none",background:filter?.dim===dk&&filter?.val===val?`${c}20`:"transparent",color:filter?.dim===dk&&filter?.val===val?c:"#94a3b8",cursor:"pointer",fontSize:9,fontFamily:"inherit",borderBottom:"1px solid #0f1d30"}}>{val}</button>)}
            </div>}
          </div>
        ))}
        {filter&&<button onClick={()=>setFilter(null)} style={{background:"#1e293b",border:"1px solid #dc2626",color:"#dc2626",padding:"2px 7px",borderRadius:4,fontSize:8,cursor:"pointer",fontFamily:"inherit"}}>✕ Reset</button>}
        {(view==="map"||view==="cross")&&<div style={{display:"flex",gap:1,background:card,borderRadius:5,padding:2,border:`1px solid ${brd}`}}>
          {[{k:"vol",l:"Volume"},{k:"rate",l:"Taux/1K"}].map(({k,l})=>(
            <button key={k} onClick={()=>setMapMode(k)} style={{background:mapMode===k?"#1e3a5f":"transparent",border:"none",color:mapMode===k?"#60a5fa":dm,padding:"2px 6px",borderRadius:3,cursor:"pointer",fontSize:8,fontFamily:"inherit"}}>{l}</button>
          ))}
        </div>}
        <span style={{marginLeft:"auto",fontSize:9,color:dm}}><span style={{color:"#e2e8f0",fontWeight:600}}>{year}</span> · {totalReg.toLocaleString()}</span>
      </div>

      <div style={{display:"grid",gridTemplateColumns:hasRight?"1fr 280px":"1fr",gap:8}}>
        <div style={{background:card,border:`1px solid ${brd}`,borderRadius:7,padding:10,minHeight:320,position:"relative",overflow:"hidden"}}>
          {view==="sec"&&<>
            <div style={{fontSize:9,color:dm,letterSpacing:1,marginBottom:6}}>SECTEURS SCIAN — {year}{filter&&<span style={{color:DIMS[filter.dim]?.c,marginLeft:6}}>▸ {filter.val}</span>}</div>
            {secBars.map(([name,val])=>(
              <div key={name} style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}>
                <span style={{fontSize:8,color:"#64748b",width:95,flexShrink:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{name}</span>
                <div style={{flex:1,height:14,background:"#0d1525",borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${(val/maxSec)*100}%`,background:`linear-gradient(90deg,${IND[ind].c}88,${IND[ind].c})`,borderRadius:3,transition:"width 0.4s"}}/>
                </div>
                <span style={{fontSize:8,color:IND[ind].c,width:40,textAlign:"right",fontWeight:600}}>{fmt(val)}</span>
              </div>
            ))}
          </>}

          {(view==="map"||view==="cross")&&<>
            <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,#0a1628 1px,transparent 1px)",backgroundSize:"26px 26px",opacity:0.2}}/>
            <svg viewBox={`0 0 ${MW} ${MH}`} style={{width:"100%",height:"auto",maxHeight:400,display:"block"}}>
              <defs><filter id="bl"><feGaussianBlur stdDeviation="3"/></filter></defs>
              {bubbles.map(b=><circle key={`g${b.c}`} cx={b.x} cy={b.y} r={b.radius*1.5} fill={b.color} opacity={0.06} filter="url(#bl)"/>)}
              {bubbles.map((b,i)=>bubbles.slice(i+1).map(b2=>{const d=Math.sqrt((b.x-b2.x)**2+(b.y-b2.y)**2);return d<100?<line key={`${b.c}-${b2.c}`} x1={b.x} y1={b.y} x2={b2.x} y2={b2.y} stroke="#152240" strokeWidth={0.4} opacity={0.2}/>:null;}))}
              {bubbles.map(b=>{const sel=selReg===b.c,hov=hovReg===b.c;return<g key={b.c} onClick={()=>setSelReg(selReg===b.c?null:b.c)} onMouseEnter={()=>setHovReg(b.c)} onMouseLeave={()=>setHovReg(null)} style={{cursor:"pointer"}}>
                {sel&&<circle cx={b.x} cy={b.y} r={b.radius+5} fill="none" stroke="#00ff88" strokeWidth={1.5} opacity={0.5}><animate attributeName="r" from={b.radius+3} to={b.radius+12} dur="1.5s" repeatCount="indefinite"/><animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite"/></circle>}
                <circle cx={b.x} cy={b.y} r={hov?b.radius+2:b.radius} fill={b.color} fillOpacity={sel?0.9:0.6} stroke={sel?"#00ff88":hov?"#fff":b.color} strokeWidth={sel?2:hov?1.5:0.5} style={{transition:"all 0.2s"}}/>
                <text x={b.x} y={b.y-1} textAnchor="middle" fill="#fff" fontSize={b.radius>16?8:6.5} fontWeight="600" style={{pointerEvents:"none"}}>{b.s}</text>
                <text x={b.x} y={b.y+(b.radius>16?8:6.5)} textAnchor="middle" fill="#ffffffbb" fontSize={b.radius>14?6.5:5.5} style={{pointerEvents:"none"}}>{fmt(b.val)}</text>
              </g>})}
              {hovReg&&(()=>{const b=bubbles.find(x=>x.c===hovReg);if(!b)return null;const tw=120,th=38,tx=Math.min(Math.max(b.x-tw/2,5),MW-tw-5),ty=b.y-b.radius-th-6;return<g><rect x={tx} y={ty} width={tw} height={th} rx={4} fill="#0d1a2dee" stroke="#1e3a5f"/><text x={tx+5} y={ty+12} fill="#e2e8f0" fontSize={7.5} fontWeight="600">{b.n}</text><text x={tx+5} y={ty+23} fill="#94a3b8" fontSize={6.5}>{b.val.toLocaleString()} lésions</text><text x={tx+5} y={ty+32} fill="#64748b" fontSize={6}>{b.p}/1000 hab.</text></g>})()}
            </svg>
            <div style={{position:"absolute",bottom:8,left:8,background:"#0d1a2dcc",borderRadius:5,padding:"4px 7px",border:"1px solid #1e3a5f"}}>
              <div style={{fontSize:6.5,color:dm,letterSpacing:1}}>{mapMode==="vol"?"VOLUME":"TAUX/1K"}</div>
              <div style={{display:"flex",gap:3,alignItems:"center",marginTop:1}}>
                {mapMode==="vol"?[{c:"rgba(96,165,250,0.6)",l:"Faible"},{c:"rgba(251,191,36,0.7)",l:"Moyen"},{c:"rgba(239,68,68,0.8)",l:"Élevé"}].map(({c,l})=><div key={l} style={{display:"flex",alignItems:"center",gap:1}}><div style={{width:6,height:6,borderRadius:"50%",background:c}}/><span style={{fontSize:5.5,color:dm}}>{l}</span></div>):[{c:"#22d3ee",l:"<14"},{c:"#60a5fa",l:"14-18"},{c:"#f59e0b",l:"18-22"},{c:"#f97316",l:"22-26"},{c:"#ef4444",l:">26"}].map(({c,l})=><div key={l} style={{display:"flex",alignItems:"center",gap:1}}><div style={{width:5,height:5,borderRadius:1,background:c}}/><span style={{fontSize:5,color:dm}}>{l}</span></div>)}
              </div>
            </div>
          </>}
        </div>

        {hasRight&&<div style={{background:card,border:`1px solid ${brd}`,borderRadius:7,padding:8,overflowY:"auto",maxHeight:400}}>
          {view==="map"&&regDetail&&<>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <div><div style={{fontSize:12,fontWeight:700,color:"#e2e8f0"}}>{regDetail.n}</div><div style={{fontSize:8,color:dm}}>{regDetail.p}/1000 hab.</div></div>
              <button onClick={()=>setSelReg(null)} style={{background:brd,border:"none",color:dm,padding:"2px 6px",borderRadius:3,cursor:"pointer",fontSize:8}}>✕</button>
            </div>
            <div style={{background:"#0d1525",borderRadius:6,padding:6,marginBottom:8,textAlign:"center"}}>
              <div style={{fontSize:22,fontWeight:800,color:"#60a5fa"}}>{regDetail.val.toLocaleString()}</div>
              <div style={{fontSize:7,color:dm}}>LÉSIONS {year} · {((regDetail.val/totalReg)*100).toFixed(1)}%</div>
            </div>
            <div style={{fontSize:7,color:dm,letterSpacing:1,marginBottom:2}}>ÉVOLUTION</div>
            <ResponsiveContainer width="100%" height={70}>
              <AreaChart data={regDetail.timeline}><defs><linearGradient id="gR" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3}/><stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/></linearGradient></defs>
                <XAxis dataKey="y" tick={{fill:dm,fontSize:7}} axisLine={false} tickLine={false}/><YAxis hide/>
                <Tooltip contentStyle={{background:"#0d1a2d",border:"1px solid #1e3a5f",borderRadius:5,fontSize:8}} formatter={v=>[v.toLocaleString()]}/>
                <Area type="monotone" dataKey="val" stroke="#60a5fa" fill="url(#gR)" strokeWidth={2}/>
              </AreaChart>
            </ResponsiveContainer>
            <div style={{fontSize:7,color:"#06b6d4",letterSpacing:1,margin:"6px 0 3px"}}>CLASSEMENT {year}</div>
            {[...D.rg].sort((a,b)=>(rm[b.c]||0)-(rm[a.c]||0)).map((r,i)=>{const v=rm[r.c]||0,me=r.c===selReg;return<div key={r.c} onClick={()=>setSelReg(r.c)} style={{display:"flex",alignItems:"center",gap:3,marginBottom:1,padding:"1px 2px",borderRadius:2,background:me?"#1e3a5f15":"transparent",cursor:"pointer"}}>
              <span style={{fontSize:7,color:me?"#60a5fa":"#334155",width:14}}>{i+1}.</span>
              <span style={{fontSize:7,color:me?"#e2e8f0":"#64748b",flex:1}}>{r.s}</span>
              <span style={{fontSize:7,color:me?"#60a5fa":dm}}>{fmt(v)}</span>
            </div>})}
          </>}
          {view==="cross"&&crossData&&<>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <div><div style={{fontSize:11,fontWeight:700,color:"#e2e8f0"}}>{D.rg.find(r=>r.c===selReg)?.n}</div><div style={{fontSize:8,color:"#06b6d4"}}>Région × Secteur</div></div>
              <button onClick={()=>setSelReg(null)} style={{background:brd,border:"none",color:dm,padding:"2px 6px",borderRadius:3,cursor:"pointer",fontSize:8}}>✕</button>
            </div>
            {crossData.map((item)=>{const max=crossData[0]?.est||1;return<div key={item.name} style={{display:"flex",alignItems:"center",gap:4,marginBottom:2}}>
              <span style={{fontSize:7,color:"#64748b",width:80,flexShrink:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</span>
              <div style={{flex:1,height:10,background:"#0d1525",borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",width:`${(item.est/max)*100}%`,background:"linear-gradient(90deg,#60a5fa44,#60a5fa88)",borderRadius:2,transition:"width 0.3s"}}/></div>
              <span style={{fontSize:7,color:"#60a5fa",width:32,textAlign:"right"}}>{fmt(item.est)}</span>
            </div>})}
            <div style={{marginTop:6,fontSize:6,color:"#334155",fontStyle:"italic"}}>Estimations proportionnelles CNESST × emploi régional</div>
          </>}
          {/* Filter evolution (sector view) */}
          {view==="sec"&&filter&&filterEvo&&<>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <div><div style={{fontSize:11,fontWeight:700,color:DIMS[filter.dim]?.c||"#e2e8f0"}}>{filter.val}</div><div style={{fontSize:8,color:dm}}>{DIMS[filter.dim]?.l} · Évolution 7 ans</div></div>
              <button onClick={()=>setFilter(null)} style={{background:brd,border:"none",color:dm,padding:"2px 6px",borderRadius:3,cursor:"pointer",fontSize:8}}>✕</button>
            </div>
            <ResponsiveContainer width="100%" height={100}>
              <AreaChart data={filterEvo}><defs><linearGradient id="gF" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={DIMS[filter.dim]?.c||"#60a5fa"} stopOpacity={0.4}/><stop offset="95%" stopColor={DIMS[filter.dim]?.c||"#60a5fa"} stopOpacity={0}/></linearGradient></defs>
                <XAxis dataKey="y" tick={{fill:dm,fontSize:7}} axisLine={false} tickLine={false}/><YAxis tick={{fill:dm,fontSize:6}} axisLine={false} tickLine={false} width={32} tickFormatter={fmt}/>
                <Tooltip contentStyle={{background:"#0d1a2d",border:"1px solid #1e3a5f",borderRadius:5,fontSize:8}} formatter={v=>[v.toLocaleString(),filter.val]}/>
                <Area type="monotone" dataKey="count" stroke={DIMS[filter.dim]?.c||"#60a5fa"} fill="url(#gF)" strokeWidth={2}/>
              </AreaChart>
            </ResponsiveContainer>
            {/* Current year value highlight */}
            <div style={{background:"#0d1525",borderRadius:6,padding:6,marginTop:8,textAlign:"center"}}>
              <div style={{fontSize:20,fontWeight:800,color:DIMS[filter.dim]?.c||"#60a5fa"}}>{(YD[filter.dim]?.[String(year)]?.[filter.val]||0).toLocaleString()}</div>
              <div style={{fontSize:7,color:dm}}>EN {year} · {((YD[filter.dim]?.[String(year)]?.[filter.val]||0)/yd.t*100).toFixed(1)}% DU TOTAL</div>
            </div>
            {/* All values for this dimension this year */}
            <div style={{marginTop:8}}>
              <div style={{fontSize:7,color:dm,letterSpacing:1,marginBottom:3}}>RÉPARTITION {DIMS[filter.dim]?.l.toUpperCase()} — {year}</div>
              {Object.entries(YD[filter.dim]?.[String(year)]||{}).sort((a,b)=>b[1]-a[1]).map(([name,count])=>{
                const max=Object.values(YD[filter.dim]?.[String(year)]||{})[0]||1;
                const isActive=name===filter.val;
                const clr=DIMS[filter.dim]?.c||"#60a5fa";
                return<div key={name} onClick={()=>setFilter({dim:filter.dim,val:name})} style={{display:"flex",alignItems:"center",gap:4,marginBottom:2,cursor:"pointer",padding:"1px 2px",borderRadius:2,background:isActive?`${clr}10`:"transparent"}}>
                  <span style={{fontSize:7,color:isActive?clr:"#64748b",width:85,flexShrink:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontWeight:isActive?600:400}}>{name}</span>
                  <div style={{flex:1,height:8,background:"#0d1525",borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",width:`${(count/max)*100}%`,background:isActive?`${clr}`:`${clr}44`,borderRadius:2}}/></div>
                  <span style={{fontSize:7,color:isActive?clr:dm,width:32,textAlign:"right"}}>{fmt(count)}</span>
                </div>;
              })}
            </div>
          </>}
        </div>}
      </div>

      <div style={{background:card,border:`1px solid ${brd}`,borderRadius:7,padding:8,marginTop:8}}>
        <div style={{fontSize:8,color:dm,letterSpacing:1,marginBottom:3}}>ÉVOLUTION 2018—2024</div>
        <ResponsiveContainer width="100%" height={90}>
          <AreaChart data={YRS.map(y=>({y,...D.yr[String(y)]}))}>
            <defs>
              <linearGradient id="gT" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#60a5fa" stopOpacity={0.15}/><stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/></linearGradient>
              <linearGradient id="gC" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ec4899" stopOpacity={0.2}/><stop offset="95%" stopColor="#ec4899" stopOpacity={0}/></linearGradient>
            </defs>
            <XAxis dataKey="y" tick={{fill:dm,fontSize:8}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:dm,fontSize:6}} axisLine={false} tickLine={false} width={32} tickFormatter={fmt}/>
            <Tooltip contentStyle={{background:"#0d1a2d",border:"1px solid #1e3a5f",borderRadius:5,fontSize:8}} formatter={v=>[v.toLocaleString()]}/>
            <Area type="monotone" dataKey="t" stroke="#60a5fa" fill="url(#gT)" strokeWidth={2} name="Total"/>
            <Area type="monotone" dataKey="cov" stroke="#ec4899" fill="url(#gC)" strokeWidth={1.5} name="COVID"/>
            <Line type="monotone" dataKey="tms" stroke="#f59e0b" strokeWidth={1.5} dot={false} name="TMS"/>
            <Line type="monotone" dataKey="psy" stroke="#a78bfa" strokeWidth={1.5} dot={false} name="Psycho."/>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <style>{`button:hover{opacity:0.85} ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:#1e3a5f;border-radius:3px}`}</style>
    </div>
  );
}