<script>
  /**
   * Node libs
   */
  import {Route} from 'tinro'

  /**
   * Pages
   */
  import Index from "$pages/Index.svelte";
  import Cookie from "$lib/Core/Cookie.svelte";
  import Theme from "$lib/Core/Theme.svelte";
  import Authorization from "$lib/Core/Authorization.svelte";
</script>

<Cookie>
    <Authorization>
        <Theme>
            <Route path="/*" firstmatch>
                <Index/>
            </Route>
        </Theme>
    </Authorization>
</Cookie>