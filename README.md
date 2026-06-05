# Albatross AI

![React](https://img.shields.io/badge/React_19-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=%23646CFF)
![Clerk](https://img.shields.io/badge/Clerk_Auth-%236C47FF.svg?style=for-the-badge&logo=clerk&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand_State-%23443E38.svg?style=for-the-badge&logo=react&logoColor=white)
![GLM 4.7 Flash](https://img.shields.io/badge/GLM--4.7_Flash-%23412991.svg?style=for-the-badge&logo=openai&logoColor=white)

<br/>

## Project Overview

**Albatross AI** is a premium, high-fidelity Retrieval-Augmented Generation (RAG) search engine workspace. It features an ultra-minimalist, custom-engineered user interface inspired by luxury design languages like fearofgod.com. 

Moving far beyond standard, context-blind LLM wrapper templates, this platform orchestrates an asynchronous pipeline that actively targets real-time web results, extracts structural snippets, and synthesizes accurate, human-readable answers back-referenced with precise inline citations and interactive source indexing.

The architecture emphasizes strict modular separation of concerns, high-density client-side state manipulation, and absolute visual economy.

---

## Key Features & Custom Engineering

### 1. Luxury Minimalist Aesthetic & Glassmorphic UI
The visual canvas has been re-architected away from generic dark modes into a highly customized aesthetic:
* **Thematic Palette:** Built around matte off-black (`#0A0A0A`) and deep slate backgrounds, using soft bone white (`#E5E5E0`) for crisp readability and muted taupe elements to minimize visual noise.
* **Glassmorphic Layers:** Complex panels like the primary search console and sidebar navigate translucent states using backdrop blurs (`backdrop-filter: blur(12px)`) bound with thin, low-opacity borders (`rgba(255, 255, 255, 0.08)`).
* **Bespoke Branding:** Features an integrated typography design modifying the primary brand header—swapping the leading 'A' for an engineered minimalist Albatross bird in full flight, intersecting with a subtle Hermione-style wand casting a fine particle spell array.

### 2. Client-Side Retrieval-Augmented Generation (RAG)
* **Execution Flow:** User Query $\rightarrow$ **SerpAPI** Engine Processing $\rightarrow$ Structural Token Sanitization $\rightarrow$ **GLM-4.7-Flash API** Context Injection $\rightarrow$ JSON-to-Markdown Response Streaming.
* The system bypasses rigid, static model weights by providing real-time data lookups, evaluating search results instantly to ground the language engine's output.

### 3. Structural Layout Optimizations
* **Virtualized History Scroll:** The sidebar tracking module has been fixed to utilize specialized `overflow-y` scrolling bound by programmatic height bounds (`calc(100vh - 200px)`), utilizing customized webkit scrollbars (4px ultra-thin tracks) that keep past conversations accessible without breaking layout constraints.
* **Advanced Code Blocks:** Features a standalone syntax highlighting execution layer powered by `react-markdown` and `rehype-highlight` that dynamically applies deep, sober code styling alongside atomic one-click copy listeners.

### 4. Deterministic Global State
* Powered by **Zustand**, global state handles asynchronous session transitions, prompt injection parameters, and active search streams. It handles local client persistence efficiently, keeping history data secure and immediately retrievable on session refresh.

---

## Technical Architecture

The systemic data lifecycle runs as a client-coordinated pipeline across three modular domains:

```mermaid
graph TD
    User[User Input Console] -->|1. Submit Query| Hook[useChat Hook Orchestrator]
    
    subgraph "RAG Context Pipeline"
        Hook -->|2. Parallel Web Fetch| Search[SerpAPI Execution Layer]
        Search -->|3. Raw Snippet Arrays| Hook
        Hook -->|4. Strict System Prompt Assembly| Prompt[Context Compiler]
        Prompt -->|5. Context + Message History| LLM[GLM-4.7-Flash LLM]
    end
    
    subgraph "State Tracking & Component Layout"
        LLM -->|6. Token Stream| UI[Glassmorphic Interface View]
        UI -->|Asynchronous Deserialization| Store[Zustand Store]
        Store -->|Cache Layer Sync| Storage[Local Storage Engines]
    end


## Technical Architecture

The systemic data lifecycle runs as a client-coordinated pipeline across three modular domains:

```mermaid
graph TD
    User[User Input Console] -->|1. Submit Query| Hook[useChat Hook Orchestrator]
    
    subgraph "RAG Context Pipeline"
        Hook -->|2. Parallel Web Fetch| Search[SerpAPI Execution Layer]
        Search -->|3. Raw Snippet Arrays| Hook
        Hook -->|4. Strict System Prompt Assembly| Prompt[Context Compiler]
        Prompt -->|5. Context + Message History| LLM[GLM-4.7-Flash LLM]
    end
    
    subgraph "State Tracking & Component Layout"
        LLM -->|6. Token Stream| UI[Glassmorphic Interface View]
        UI -->|Asynchronous Deserialization| Store[Zustand Store]
        Store -->|Cache Layer Sync| Storage[Local Storage Engines]
    end
