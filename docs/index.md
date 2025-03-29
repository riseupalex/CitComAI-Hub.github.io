---
    template: home.html
---
<style>
/* Hide title on the home page */
article > h1 {
    display: none
}

/* Fix title font-weight */
body > header > nav > div.md-header__title.md-header__title--active > div > div:nth-child(2){
    font-weight: 700;   
}
.package-icon{
    width: 5rem;
}
body > div.md-container > main > div > div > article > a{
    display: none
}
</style>

<div style="text-align: center;">

<img class="package-icon" src="./assets/package.png">
  <h1>Minimal Package for TEF nodes</h1>
  <p>Work package 3 (WP3) provides the <strong>Minimal Package for CitCom.ai TEF (Testing and Experimentation Facility) nodes</strong>, which contains comprehensive <strong>guides, toolboxes, and deployment frameworks</strong> to ensure interoperability across the wide range of TEF nodes by defining a <strong>common reference architecture</strong>. Based on this architecture, it also provides support and examples to develop <strong>AI services</strong>.</p> 
</div>

<br>
### Package components:
<div class="grid cards" markdown>

-   :material-rocket-outline:{ .lg .middle } __Getting Started__

    ---

    Start by learning the basics of CitCom.ai and its common reference architecture.

    [:octicons-arrow-right-24: Learn more](./welcome.md)

-   :material-city-variant-outline:{ .lg .middle } __TEF Nodes__

    ---

    Testing and Experimentation Facility (TEF) nodes.

    [:octicons-arrow-right-24: Learn more](./tef/index.md)

-   :material-toolbox-outline:{ .lg .middle } __Toolbox__

    ---

    A set of useful tools compatible with MIMs.

    [:octicons-arrow-right-24: Learn more](./toolbox/index.md)

-   :material-robot-outline:{ .lg .middle } __AI Services__

    ---

    Minimal interoperable AI services for platforms compatible with MIMs.

    [:octicons-arrow-right-24: Learn more](./services/index.md)

-   :material-file-document-outline:{ .lg .middle } __Documentation__

    ---

    Reports and deployment guides of different components.

    [:octicons-arrow-right-24: Learn more](./documentation/index.md)

-   :material-store-search-outline:{ .lg .middle } __Data Catalog__

    ---

    Centralized hub to keep track of available datasets.

    [:octicons-arrow-right-24: Learn more](./data_catalog/index.md)

</div>
