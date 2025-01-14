"use strict";(self.webpackChunk_rockshin_react_image_annotation=self.webpackChunk_rockshin_react_image_annotation||[]).push([["880"],{"./src/styles/base.css":function(){},"./stories/loading.stories.tsx":function(e,s,a){a.r(s),a.d(s,{SlowProgress:()=>w,WithChildren:()=>L,WithFetch:()=>b,WithAutoComplete:()=>y,CustomStyling:()=>j,WithNestedComponents:()=>S,default:()=>x,__namedExportsOrder:()=>_,DarkTheme:()=>C,Default:()=>f,CustomConfiguration:()=>h});var r=a("./node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-runtime.js"),t=a("./node_modules/.pnpm/react@18.3.1/node_modules/react/index.js"),n=a("./src/Button.tsx"),o=a("./node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs"),i=a("./node_modules/.pnpm/motion@11.17.0_react-dom@18.3.1_react@18.3.1/node_modules/motion/dist/es/framer-motion/dist/es/render/components/motion/proxy.mjs");let l=100,d=2,u=300,c=90,m="Loading...",p=!0;function g(e){let{loadingText:s=m,className:a="",content:n="",children:g,isLoading:x=!1,progressInterval:f=l,progressIncrement:h=d,expandDelay:N=u,maxAutoProgress:b=c,autoProgress:v=p,contentClassName:y="",loadingSpinnerClassName:w="",progressBarClassName:j=""}=e,[C,T]=(0,t.useState)({progress:0,showContent:!1,expanded:!1}),L=(0,t.useRef)(null),[S,_]=(0,t.useState)(0);return(0,t.useEffect)(()=>{x?T({progress:0,showContent:!1,expanded:!1}):(n||g)&&(T(e=>({...e,showContent:!0})),setTimeout(()=>{T(e=>({...e,expanded:!0}))},N))},[x,n,g,N]),(0,t.useEffect)(()=>{if(!v||!x)return;let e=setInterval(()=>{T(e=>({...e,progress:e.progress>=b?b:e.progress+h}))},f);return()=>clearInterval(e)},[x,v,b,h,f]),(0,t.useEffect)(()=>{!x&&C.progress<100&&T(e=>({...e,progress:100}))},[x]),(0,t.useEffect)(()=>{L.current&&_(L.current.scrollHeight+32)},[C.showContent]),(0,r.jsx)("div",{className:"w-full max-w-2xl mx-auto",children:(0,r.jsx)("div",{className:"transition-all duration-500 ease-out transform",children:(0,r.jsx)(i.E.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},className:(0,o.W)("relative bg-white overflow-hidden","transition-all duration-500 ease-in-out",C.showContent?"rounded-[16px] border border-[#e5e7eb]":"rounded-2xl border border-[#e5e7eb]",C.expanded?"transform-none":"scale-95 opacity-90","shadow-sm",C.showContent&&"animate-expand-width",a),style:{height:C.expanded?S||"auto":"40px"},children:(0,r.jsx)("div",{className:(0,o.W)("px-6 flex items-center h-full justify-between","transition-all duration-500 ease-in-out",C.showContent&&"animate-slide-content",C.showContent&&"py-4"),children:C.showContent?g?(0,r.jsx)("div",{ref:L,className:(0,o.W)("w-full transition-all duration-500 ease-in-out",C.expanded?"opacity-100":"opacity-0",y),children:g}):n?(0,r.jsx)("div",{ref:L,className:(0,o.W)("w-full transition-all duration-500 ease-in-out",C.expanded?"opacity-100":"opacity-0",y),children:(0,r.jsx)("div",{className:"prose prose-gray max-w-none py-4",children:n.split("\n\n").map((e,s)=>(0,r.jsx)("p",{className:"mb-4 text-[#181b25] leading-relaxed",children:e},s))})}):null:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"flex items-center",children:(0,r.jsx)("span",{className:"text-[14px] font-medium text-[#181b25] whitespace-nowrap",children:s})}),(0,r.jsx)(i.E.div,{className:(0,o.W)("h-4 w-4 border-2 border-[#9672e4] border-t-transparent rounded-full ml-3",w),animate:{rotate:360},transition:{duration:1,repeat:1/0,ease:"linear"}}),(0,r.jsx)("div",{className:(0,o.W)("absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#9672e4] to-[#e0daff] transition-all duration-100",j),style:{width:`${C.progress}%`}})]})})})})})}g.__docgenInfo={description:"",methods:[],displayName:"Loading",props:{loadingText:{required:!1,tsType:{name:"string"},description:"Text displayed during the loading state",defaultValue:{value:"'Loading...'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional className for the main container",defaultValue:{value:"''",computed:!1}},content:{required:!1,tsType:{name:"string"},description:"Content to display after loading completes. Can be a string or React nodes",defaultValue:{value:"''",computed:!1}},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"React nodes to display after loading completes"},isLoading:{required:!1,tsType:{name:"boolean"},description:"Controls the loading state",defaultValue:{value:"false",computed:!1}},progressInterval:{required:!1,tsType:{name:"number"},description:"Interval (in ms) between progress updates. Default: 100",defaultValue:{value:"100",computed:!1}},progressIncrement:{required:!1,tsType:{name:"number"},description:"Amount to increment progress by each interval. Default: 2",defaultValue:{value:"2",computed:!1}},expandDelay:{required:!1,tsType:{name:"number"},description:"Delay (in ms) before expanding the container to show content. Default: 300",defaultValue:{value:"300",computed:!1}},maxAutoProgress:{required:!1,tsType:{name:"number"},description:"Maximum progress value for auto-progress. Default: 90",defaultValue:{value:"90",computed:!1}},autoProgress:{required:!1,tsType:{name:"boolean"},description:"Enable/disable automatic progress animation. Default: true",defaultValue:{value:"true",computed:!1}},contentClassName:{required:!1,tsType:{name:"string"},description:"Additional className for the content container",defaultValue:{value:"''",computed:!1}},loadingSpinnerClassName:{required:!1,tsType:{name:"string"},description:"Additional className for the loading spinner",defaultValue:{value:"''",computed:!1}},progressBarClassName:{required:!1,tsType:{name:"string"},description:"Additional className for the progress bar",defaultValue:{value:"''",computed:!1}}}},a("./src/styles/base.css");let x={title:"Components/Loading",component:g,parameters:{layout:"centered"},tags:["autodocs"]},f={args:{loadingText:"Loading...",className:"w-[400px]",isLoading:!0}},h={args:{loadingText:"Processing...",progressInterval:50,progressIncrement:5,maxAutoProgress:95,className:"w-[400px]",loadingSpinnerClassName:"border-purple-500",progressBarClassName:"bg-gradient-to-r from-purple-500 to-purple-300",isLoading:!0}},N=()=>{let[e,s]=(0,t.useState)(!1),[a,o]=(0,t.useState)(""),i=async()=>{s(!0);try{await new Promise(e=>setTimeout(e,2e3)),o("Data successfully fetched! This is an example of how the component expands to show content after loading completes.")}finally{s(!1)}};return(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsx)(n.z,{onClick:i,primary:!0,children:e?"Fetching...":"Fetch Data"}),(0,r.jsx)("div",{className:"m-2"}),(0,r.jsx)(g,{loadingText:"Fetching data...",isLoading:e,content:a,className:"w-[400px]"})]})},b={render:()=>(0,r.jsx)(N,{})},v=()=>{let[e,s]=(0,t.useState)(!1),[a,n]=(0,t.useState)(""),[o,i]=(0,t.useState)("");return(0,t.useEffect)(()=>{let e=setTimeout(()=>{a&&(s(!0),setTimeout(()=>{i(`Found results for "${a}": 

Example Result 1

Example Result 2

Example Result 3`),s(!1)},1500))},300);return()=>clearTimeout(e)},[a]),(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsx)("input",{type:"text",value:a,onChange:e=>n(e.target.value),placeholder:"Type to search...",className:"w-full px-4 py-2 rounded-md border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"}),(0,r.jsx)(g,{loadingText:"Searching...",isLoading:e,content:o,className:"w-[400px]",progressInterval:50})]})},y={render:()=>(0,r.jsx)(v,{})},w={args:{loadingText:"Uploading large file...",className:"w-[400px]",progressInterval:200,progressIncrement:1,maxAutoProgress:95,isLoading:!0}},j={args:{loadingText:"Processing...",className:"w-[400px] bg-gradient-to-r from-purple-50 to-pink-50",loadingSpinnerClassName:"border-pink-500",progressBarClassName:"bg-gradient-to-r from-purple-500 to-pink-500",isLoading:!0}},C={decorators:[e=>(0,r.jsx)("div",{className:"bg-slate-800 p-8 rounded-lg",children:(0,r.jsx)(e,{})})],args:{loadingText:"Loading...",className:"w-[400px] bg-slate-700",loadingSpinnerClassName:"border-purple-400",progressBarClassName:"bg-gradient-to-r from-purple-400 to-purple-200",contentClassName:"text-slate-200",isLoading:!0}},T=()=>(0,r.jsxs)("div",{className:"p-4 space-y-4",children:[(0,r.jsx)("h3",{className:"text-xl font-semibold text-purple-700",children:"Custom Content"}),(0,r.jsxs)("div",{className:"flex gap-4",children:[(0,r.jsxs)("div",{className:"bg-purple-100 p-4 rounded-lg flex-1",children:[(0,r.jsx)("h4",{className:"font-medium mb-2",children:"Section 1"}),(0,r.jsx)("p",{children:"This is a custom React component inside Loading."})]}),(0,r.jsxs)("div",{className:"bg-pink-100 p-4 rounded-lg flex-1",children:[(0,r.jsx)("h4",{className:"font-medium mb-2",children:"Section 2"}),(0,r.jsx)("p",{children:"You can put any React nodes here."})]})]})]}),L={render:()=>{let[e,s]=(0,t.useState)(!0);return(0,t.useEffect)(()=>{let e=setTimeout(()=>s(!1),2e3);return()=>clearTimeout(e)},[]),(0,r.jsx)(g,{isLoading:e,className:"w-[600px]",children:(0,r.jsx)(T,{})})}},S={render:()=>{let[e,s]=(0,t.useState)(!0);return(0,t.useEffect)(()=>{let e=setTimeout(()=>s(!1),2e3);return()=>clearTimeout(e)},[]),(0,r.jsx)(g,{isLoading:e,className:"w-[400px]",children:(0,r.jsxs)("div",{className:"p-4",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2 mb-4",children:[(0,r.jsx)("div",{className:"w-12 h-12 rounded-full bg-purple-200"}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h3",{className:"font-medium",children:"John Doe"}),(0,r.jsx)("p",{className:"text-sm text-gray-600",children:"Software Engineer"})]})]}),(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsx)("div",{className:"h-2 bg-purple-100 rounded w-full"}),(0,r.jsx)("div",{className:"h-2 bg-purple-100 rounded w-3/4"}),(0,r.jsx)("div",{className:"h-2 bg-purple-100 rounded w-1/2"})]})]})})}},_=["Default","CustomConfiguration","WithFetch","WithAutoComplete","SlowProgress","CustomStyling","DarkTheme","WithChildren","WithNestedComponents"];f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:"{\n  args: {\n    loadingText: 'Loading...',\n    className: 'w-[400px]',\n    isLoading: true\n  }\n}",...f.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:"{\n  args: {\n    loadingText: 'Processing...',\n    progressInterval: 50,\n    progressIncrement: 5,\n    maxAutoProgress: 95,\n    className: 'w-[400px]',\n    loadingSpinnerClassName: 'border-purple-500',\n    progressBarClassName: 'bg-gradient-to-r from-purple-500 to-purple-300',\n    isLoading: true\n  }\n}",...h.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:"{\n  render: () => <FetchExample />\n}",...b.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:"{\n  render: () => <AutoCompleteExample />\n}",...y.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:"{\n  args: {\n    loadingText: 'Uploading large file...',\n    className: 'w-[400px]',\n    progressInterval: 200,\n    progressIncrement: 1,\n    maxAutoProgress: 95,\n    isLoading: true\n  }\n}",...w.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:"{\n  args: {\n    loadingText: 'Processing...',\n    className: 'w-[400px] bg-gradient-to-r from-purple-50 to-pink-50',\n    loadingSpinnerClassName: 'border-pink-500',\n    progressBarClassName: 'bg-gradient-to-r from-purple-500 to-pink-500',\n    isLoading: true\n  }\n}",...j.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:"{\n  decorators: [Story => <div className=\"bg-slate-800 p-8 rounded-lg\">\n        <Story />\n      </div>],\n  args: {\n    loadingText: 'Loading...',\n    className: 'w-[400px] bg-slate-700',\n    loadingSpinnerClassName: 'border-purple-400',\n    progressBarClassName: 'bg-gradient-to-r from-purple-400 to-purple-200',\n    contentClassName: 'text-slate-200',\n    isLoading: true\n  }\n}",...C.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const [isLoading, setIsLoading] = useState(true);\n    useEffect(() => {\n      const timer = setTimeout(() => setIsLoading(false), 2000);\n      return () => clearTimeout(timer);\n    }, []);\n    return <Loading isLoading={isLoading} className="w-[600px]">\n        <ComplexContent />\n      </Loading>;\n  }\n}',...L.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const [isLoading, setIsLoading] = useState(true);\n    useEffect(() => {\n      const timer = setTimeout(() => setIsLoading(false), 2000);\n      return () => clearTimeout(timer);\n    }, []);\n    return <Loading isLoading={isLoading} className="w-[400px]">\n        <div className="p-4">\n          <div className="flex items-center gap-2 mb-4">\n            <div className="w-12 h-12 rounded-full bg-purple-200" />\n            <div>\n              <h3 className="font-medium">John Doe</h3>\n              <p className="text-sm text-gray-600">Software Engineer</p>\n            </div>\n          </div>\n          <div className="space-y-2">\n            <div className="h-2 bg-purple-100 rounded w-full" />\n            <div className="h-2 bg-purple-100 rounded w-3/4" />\n            <div className="h-2 bg-purple-100 rounded w-1/2" />\n          </div>\n        </div>\n      </Loading>;\n  }\n}',...S.parameters?.docs?.source}}}},"./src/Button.tsx":function(e,s,a){a.d(s,{z:()=>t});var r=a("./node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-runtime.js");let t=e=>{let{primary:s=!1,size:a="medium",backgroundColor:t,children:n,...o}=e;return(0,r.jsx)("button",{type:"button",className:["demo-button",`demo-button--${a}`,s?"demo-button--primary":"demo-button--secondary"].join(" "),style:{backgroundColor:t},...o,children:n})};t.__docgenInfo={description:"",methods:[],displayName:"Button",props:{className:{required:!1,tsType:{name:"string"},description:""},primary:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},backgroundColor:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"",defaultValue:{value:"'medium'",computed:!1}},children:{required:!0,tsType:{name:"string"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}}}}]);
//# sourceMappingURL=loading-stories.5616b409.iframe.bundle.js.map