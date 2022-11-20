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
    import Registration from "$pages/Registration.svelte";
    import URL from "$lib/Core/URL.svelte";
    import Profile from "$pages/Profile.svelte";
    import Links from "$lib/Links/Links.svelte";

</script>

<Cookie>
    <Authorization>
            <Theme>
                <URL>
                    <Route path="/*" firstmatch>
                        <Route path="/">
                            <Index/>
                        </Route>

                        <Route path="/registration">
                            <Registration/>
                        </Route>

                        <Route path="/profile">
                            <Profile/>
                        </Route>

                        <Route fallback redirect="/"/>
                    </Route>
                </URL>
            </Theme>
    </Authorization>
</Cookie>