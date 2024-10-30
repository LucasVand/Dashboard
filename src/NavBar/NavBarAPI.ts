

export async function getNavbarData() {
    var navBarStats: string[] = []
    await fetch('http://129.100.199.139:7000/navBarAPI')
        .then((res) => res.json())
        .then((data) => {
            navBarStats = data
        })
    return navBarStats
}